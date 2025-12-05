const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    getOptimizedUrl,
    validateFile
} = require('../controllers/uploadFile');

// Configurar multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB límite general
    }
});

/**
 * POST /api/upload/single
 * Sube un solo archivo
 * Body: multipart/form-data con campo 'file'
 * Query params opcionales: ?folder=nombre_carpeta
 */
router.post('/single', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No se proporcionó ningún archivo'
            });
        }

        const options = {
            folder: req.query.folder || req.body.folder || 'uploads',
            overwrite: req.body.overwrite === 'true'
        };

        const result = await uploadFile(req.file, options);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.error || error.message || 'Error al subir el archivo'
        });
    }
});

/**
 * POST /api/upload/multiple
 * Sube múltiples archivos
 * RESTRICCIÓN: Todos los archivos deben ser del mismo tipo (solo imágenes, solo videos, etc.)
 * Body: multipart/form-data con campo 'files' (array)
 * Query params opcionales: ?folder=nombre_carpeta
 */
router.post('/multiple', upload.array('files', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No se proporcionaron archivos'
            });
        }

        const options = {
            folder: req.query.folder || req.body.folder || 'uploads',
            overwrite: req.body.overwrite === 'true'
        };

        const result = await uploadMultipleFiles(req.files, options);
        
        res.status(200).json(result);
    } catch (error) {
        // Manejar error de tipos mixtos
        if (error.detectedTypes) {
            return res.status(400).json({
                success: false,
                error: error.error,
                detectedTypes: error.detectedTypes,
                message: 'Solo puedes subir archivos del mismo tipo en una sola operación'
            });
        }

        res.status(500).json({
            success: false,
            error: error.error || error.message || 'Error al subir los archivos'
        });
    }
});

/**
 * DELETE /api/upload/:publicId
 * Elimina un archivo de Cloudinary
 * Params: publicId (debe estar URL encoded)
 * Query params: ?resourceType=image|video|raw
 */
router.delete('/:publicId(*)', async (req, res) => {
    try {
        const publicId = decodeURIComponent(req.params.publicId);
        const resourceType = req.query.resourceType || 'image';

        const result = await deleteFile(publicId, resourceType);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.error || error.message || 'Error al eliminar el archivo'
        });
    }
});

/**
 * POST /api/upload/validate
 * Valida un archivo sin subirlo
 * Body: multipart/form-data con campo 'file'
 */
router.post('/validate', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No se proporcionó ningún archivo'
            });
        }

        const validation = validateFile(req.file);
        
        if (validation.valid) {
            res.status(200).json({
                valid: true,
                fileType: validation.fileType,
                message: 'El archivo es válido y puede ser subido'
            });
        } else {
            res.status(400).json({
                valid: false,
                error: validation.error
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Error al validar el archivo'
        });
    }
});

/**
 * GET /api/upload/optimized-url/:publicId
 * Obtiene una URL optimizada para un archivo
 * Params: publicId (debe estar URL encoded)
 * Query params opcionales: ?width=500&height=500&quality=80
 */
router.get('/optimized-url/:publicId(*)', (req, res) => {
    try {
        const publicId = decodeURIComponent(req.params.publicId);
        const transformations = {};

        if (req.query.width) transformations.width = parseInt(req.query.width);
        if (req.query.height) transformations.height = parseInt(req.query.height);
        if (req.query.quality) transformations.quality = req.query.quality;
        if (req.query.crop) transformations.crop = req.query.crop;
        if (req.query.gravity) transformations.gravity = req.query.gravity;

        const url = getOptimizedUrl(publicId, transformations);
        
        res.status(200).json({
            success: true,
            url
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Error al generar URL optimizada'
        });
    }
});

module.exports = router;
