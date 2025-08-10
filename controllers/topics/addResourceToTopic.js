const Topic = require("../../models/Topics");

const addResourceToTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { resourceId, isMandatory = false } = req.body;
        console.log(topicId, resourceId, isMandatory);
    
        // Validar que se proporcione un ID de recurso
        if (!resourceId) {
            return res.status(400).json({ 
                error: "Se requiere el ID del recurso (resourceId)" 
            });
        }

        // Buscar el tema y actualizarlo
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ 
                error: "Tema no encontrado" 
            });
        }

        // Verificar si el recurso ya existe en el tema
        const resourceExists = topic.resources.some(
            r => r._id.toString() === resourceId
        );

        if (resourceExists) {
            return res.status(400).json({ 
                error: "El recurso ya existe en este tema" 
            });
        }

        // Agregar el recurso al tema
        topic.resources.push({ 
            _id: resourceId, 
            isMandatory 
        });

        await topic.save();
        
        res.status(200).json({
            ok: true,
            message: "Recurso agregado al tema exitosamente",
            topic
        });
    } catch (error) {
        console.error("Error al agregar recurso al tema:", error);
        res.status(500).json({ 
            ok: false,
            error: "Error interno del servidor al agregar el recurso al tema" 
        });
    }
};

module.exports = addResourceToTopic;