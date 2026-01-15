const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    updateFile,
    replaceFile,
    getOptimizedUrl,
    validateFile
} = require('../controllers/uploadFile/uploadFile');

// Configurar multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB límite general
    }
});

// Middleware para manejar errores de Multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Errores específicos de Multer
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'El archivo excede el tamaño máximo permitido de 100MB'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                error: 'Se excedió el número máximo de archivos permitidos'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                error: 'Campo de archivo inesperado. Asegúrate de usar el nombre de campo correcto'
            });
        }
        if (err.code === 'MISSING_FIELD_NAME') {
            return res.status(400).json({
                success: false,
                error: 'El campo del archivo no tiene nombre. Asegúrate de que tu formulario incluya el atributo "name" en el campo de archivo',
                hint: 'En HTML: <input type="file" name="file" />. En fetch/axios: usa FormData con formData.append("file", archivo)',
                examples: {
                    fetch: 'const formData = new FormData(); formData.append("file", archivo); fetch(url, {method: "POST", body: formData})',
                    axios: 'const formData = new FormData(); formData.append("file", archivo); axios.post(url, formData)',
                    curl: 'curl -X POST -F "file=@ruta/al/archivo.jpg" URL'
                }
            });
        }
        return res.status(400).json({
            success: false,
            error: `Error de Multer: ${err.message}`,
            code: err.code
        });
    }
    next(err);
};

/**
 * POST /api/upload/single
 * Sube un solo archivo
 * Body: multipart/form-data con campo 'file' o 'archivo'
 * Query params opcionales: ?folder=nombre_carpeta
 */
router.post('/single', upload.any(), handleMulterError, async (req, res) => {
    try {
        // Buscar el archivo en cualquier campo
        const file = req.files && req.files.length > 0 ? req.files[0] : null;
        
        if (!file) {
            return res.status(400).json({
                success: false,
                error: 'No se proporcionó ningún archivo. Asegúrate de incluir un archivo en el campo del formulario multipart/form-data',
                hint: 'Usa el campo "file" o cualquier otro nombre para enviar el archivo'
            });
        }

        const options = {
            folder: req.query.folder || req.body.folder || 'uploads',
            overwrite: req.body.overwrite === 'true'
        };

        const result = await uploadFile(file, options);
        
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
 * Body: multipart/form-data con campo 'files' o cualquier nombre (array)
 * Query params opcionales: ?folder=nombre_carpeta
 */
router.post('/multiple', upload.any(), handleMulterError, async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No se proporcionaron archivos',
                hint: 'Asegúrate de enviar archivos en el formulario multipart/form-data'
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
 * PUT /api/upload/update/:publicId
 * Actualiza un archivo existente (elimina el anterior y sube uno nuevo)
 * Params: publicId del archivo a reemplazar (debe estar URL encoded)
 * Body: multipart/form-data con el nuevo archivo
 * Query params opcionales: 
 *   ?folder=nombre_carpeta
 *   ?resourceType=image|video|raw (tipo del archivo anterior)
 *   ?keepPublicId=true (mantener el mismo publicId)
 */
router.put('/update/:publicId(*)', upload.any(), handleMulterError, async (req, res) => {
    try {
        const oldPublicId = decodeURIComponent(req.params.publicId);
        const file = req.files && req.files.length > 0 ? req.files[0] : null;
        
        if (!file) {
            return res.status(400).json({
                success: false,
                error: 'No se proporcionó ningún archivo nuevo para actualizar'
            });
        }

        const options = {
            folder: req.query.folder || req.body.folder,
            oldResourceType: req.query.resourceType || req.body.resourceType,
            keepPublicId: req.query.keepPublicId === 'true' || req.body.keepPublicId === 'true',
            overwrite: req.body.overwrite === 'true'
        };

        const result = await updateFile(oldPublicId, file, options);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.error || error.message || 'Error al actualizar el archivo'
        });
    }
});

/**
 * PUT /api/upload/replace/:publicId
 * Reemplaza un archivo manteniendo exactamente el mismo publicId
 * Params: publicId del archivo a reemplazar (debe estar URL encoded)
 * Body: multipart/form-data con el nuevo archivo
 * Query params opcionales: ?folder=nombre_carpeta
 */
router.put('/replace/:publicId(*)', upload.any(), handleMulterError, async (req, res) => {
    try {
        const publicId = decodeURIComponent(req.params.publicId);
        const file = req.files && req.files.length > 0 ? req.files[0] : null;
        
        if (!file) {
            return res.status(400).json({
                success: false,
                error: 'No se proporcionó ningún archivo para reemplazar'
            });
        }

        const options = {
            folder: req.query.folder || req.body.folder
        };

        const result = await replaceFile(publicId, file, options);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.error || error.message || 'Error al reemplazar el archivo'
        });
    }
});

/**
 * POST /api/upload/validate
 * Valida un archivo sin subirlo
 * Body: multipart/form-data con cualquier nombre de campo
 */
router.post('/validate', upload.any(), handleMulterError, async (req, res) => {
    try {
        const file = req.files && req.files.length > 0 ? req.files[0] : null;
        
        if (!file) {
            return res.status(400).json({
                success: false,
                error: 'No se proporcionó ningún archivo'
            });
        }

        const validation = validateFile(file);
        
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
