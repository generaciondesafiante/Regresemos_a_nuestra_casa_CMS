import { v2 as cloudinary } from 'cloudinary';
require('dotenv').config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de tipos de archivo permitidos
const ALLOWED_FILE_TYPES = {
    image: {
        mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
        maxSize: 10 * 1024 * 1024, // 10MB
        resourceType: 'image'
    },
    video: {
        mimeTypes: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
        extensions: ['.mp4', '.mpeg', '.mov', '.avi', '.webm'],
        maxSize: 100 * 1024 * 1024, // 100MB
        resourceType: 'video'
    },
    pdf: {
        mimeTypes: ['application/pdf'],
        extensions: ['.pdf'],
        maxSize: 20 * 1024 * 1024, // 20MB
        resourceType: 'image' // Cloudinary trata PDFs como imágenes
    },
    audio: {
        mimeTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm'],
        extensions: ['.mp3', '.mpeg', '.wav', '.ogg', '.webm'],
        maxSize: 50 * 1024 * 1024, // 50MB
        resourceType: 'video' // Cloudinary trata audio como video
    }
};

/**
 * Detecta el tipo de archivo basado en mimetype o extensión
 * @param {Object} file - Archivo a validar
 * @returns {string|null} - Tipo de archivo o null si no es válido
 */
const detectFileType = (file) => {
    const mimeType = file.mimetype?.toLowerCase();
    const fileName = file.originalname?.toLowerCase() || file.name?.toLowerCase();
    
    for (const [type, config] of Object.entries(ALLOWED_FILE_TYPES)) {
        // Verificar por mimetype
        if (mimeType && config.mimeTypes.includes(mimeType)) {
            return type;
        }
        
        // Verificar por extensión
        if (fileName && config.extensions.some(ext => fileName.endsWith(ext))) {
            return type;
        }
    }
    
    return null;
};

/**
 * Valida el archivo antes de subirlo
 * @param {Object} file - Archivo a validar
 * @returns {Object} - { valid: boolean, error: string, fileType: string }
 */
const validateFile = (file) => {
    if (!file) {
        return { valid: false, error: 'No se proporcionó ningún archivo' };
    }

    const fileType = detectFileType(file);
    
    if (!fileType) {
        return { 
            valid: false, 
            error: 'Tipo de archivo no permitido. Solo se aceptan: imágenes, videos, PDFs y audio' 
        };
    }

    const config = ALLOWED_FILE_TYPES[fileType];
    const fileSize = file.size || file.buffer?.length || 0;

    if (fileSize > config.maxSize) {
        return { 
            valid: false, 
            error: `El archivo ${fileType} excede el tamaño máximo permitido de ${config.maxSize / (1024 * 1024)}MB` 
        };
    }

    return { valid: true, fileType, config };
};

/**
 * Genera un nombre único para el archivo
 * @param {string} originalName - Nombre original del archivo
 * @param {string} folder - Carpeta de destino
 * @returns {string} - Nombre único generado
 */
const generateUniqueFileName = (originalName, folder = '') => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const nameWithoutExt = originalName.split('.').slice(0, -1).join('.');
    const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '_');
    
    const publicId = folder 
        ? `${folder}/${sanitizedName}_${timestamp}_${randomString}`
        : `${sanitizedName}_${timestamp}_${randomString}`;
    
    return publicId;
};

/**
 * Sube un archivo a Cloudinary
 * @param {Object} file - Archivo a subir (puede ser buffer, path o base64)
 * @param {Object} options - Opciones de subida
 * @returns {Promise<Object>} - Resultado de la subida
 */
const uploadFile = async (file, options = {}) => {
    try {
        // Validar archivo
        const validation = validateFile(file);
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        const { fileType, config } = validation;
        
        // Opciones por defecto
        const defaultOptions = {
            folder: options.folder || 'uploads',
            resource_type: config.resourceType,
            public_id: generateUniqueFileName(
                file.originalname || file.name || 'file',
                options.folder
            ),
            overwrite: options.overwrite || false,
            unique_filename: false,
            use_filename: false
        };

        // Opciones específicas por tipo de archivo
        const typeSpecificOptions = {};
        
        if (fileType === 'image') {
            typeSpecificOptions.transformation = options.transformation || [
                { quality: 'auto', fetch_format: 'auto' }
            ];
        } else if (fileType === 'video') {
            typeSpecificOptions.eager = options.eager || [
                { streaming_profile: 'hd', format: 'mp4' }
            ];
            typeSpecificOptions.eager_async = true;
        } else if (fileType === 'pdf') {
            typeSpecificOptions.format = 'pdf';
        }

        // Combinar todas las opciones
        const uploadOptions = {
            ...defaultOptions,
            ...typeSpecificOptions,
            ...options.customOptions // Permite opciones personalizadas adicionales
        };

        // Determinar la fuente del archivo
        let fileSource;
        if (file.buffer) {
            // Archivo en memoria (multer con memoryStorage)
            fileSource = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        } else if (file.path) {
            // Archivo en disco (multer con diskStorage)
            fileSource = file.path;
        } else if (file.tempFilePath) {
            // Archivo temporal (express-fileupload)
            fileSource = file.tempFilePath;
        } else {
            throw new Error('Formato de archivo no soportado');
        }

        // Subir a Cloudinary
        const result = await cloudinary.uploader.upload(fileSource, uploadOptions);

        // Retornar información útil
        return {
            success: true,
            fileType,
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            resourceType: result.resource_type,
            size: result.bytes,
            width: result.width,
            height: result.height,
            duration: result.duration, // Para video/audio
            pages: result.pages, // Para PDFs
            createdAt: result.created_at,
            metadata: {
                originalName: file.originalname || file.name,
                mimeType: file.mimetype
            }
        };

    } catch (error) {
        console.error('Error al subir archivo:', error);
        throw {
            success: false,
            error: error.message || 'Error desconocido al subir el archivo',
            details: error
        };
    }
};

/**
 * Sube múltiples archivos a Cloudinary
 * RESTRICCIÓN: Todos los archivos deben ser del mismo tipo
 * @param {Array} files - Array de archivos a subir
 * @param {Object} options - Opciones de subida
 * @returns {Promise<Array>} - Array de resultados
 */
const uploadMultipleFiles = async (files, options = {}) => {
    if (!Array.isArray(files) || files.length === 0) {
        throw new Error('Se debe proporcionar un array de archivos');
    }

    // Validar que todos los archivos sean del mismo tipo
    const fileTypes = new Set();
    const validations = [];

    for (const file of files) {
        const validation = validateFile(file);
        validations.push(validation);
        
        if (validation.valid) {
            fileTypes.add(validation.fileType);
        }
    }

    // Verificar que solo haya un tipo de archivo
    if (fileTypes.size > 1) {
        throw {
            success: false,
            error: `Solo se puede subir un tipo de archivo a la vez. Se detectaron: ${Array.from(fileTypes).join(', ')}`,
            detectedTypes: Array.from(fileTypes)
        };
    }

    if (fileTypes.size === 0) {
        throw {
            success: false,
            error: 'No se detectó ningún tipo de archivo válido'
        };
    }

    const uploadPromises = files.map(file => 
        uploadFile(file, options)
            .catch(error => ({
                success: false,
                fileName: file.originalname || file.name,
                error: error.error || error.message
            }))
    );

    const results = await Promise.all(uploadPromises);
    
    return {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        fileType: Array.from(fileTypes)[0], // El tipo único de archivo
        results
    };
};

/**
 * Elimina un archivo de Cloudinary
 * @param {string} publicId - ID público del archivo
 * @param {string} resourceType - Tipo de recurso (image, video, raw)
 * @returns {Promise<Object>} - Resultado de la eliminación
 */
const deleteFile = async (publicId, resourceType = 'image') => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });

        return {
            success: result.result === 'ok',
            message: result.result === 'ok' ? 'Archivo eliminado exitosamente' : 'No se pudo eliminar el archivo',
            result
        };
    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        throw {
            success: false,
            error: error.message || 'Error al eliminar el archivo'
        };
    }
};

/**
 * Obtiene la URL optimizada de un archivo
 * @param {string} publicId - ID público del archivo
 * @param {Object} transformations - Transformaciones a aplicar
 * @returns {string} - URL optimizada
 */
const getOptimizedUrl = (publicId, transformations = {}) => {
    const defaultTransformations = {
        fetch_format: 'auto',
        quality: 'auto',
        ...transformations
    };

    return cloudinary.url(publicId, defaultTransformations);
};

// Exportar funciones
module.exports = {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    getOptimizedUrl,
    validateFile,
    detectFileType,
    ALLOWED_FILE_TYPES
};