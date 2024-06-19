const Course = require("../../models/Courses");

const deleteResourceFromTopic = async (req, res) => {
    const { idCourse, topicId, resourceId } = req.params;
  
    try {
      const course = await Course.findById(idCourse);
  
      if (!course) {
        return res.status(404).json({ message: "Curso no encontrado" });
      }
  
      const topic = course.topic.id(topicId);
      if (!topic) {
        return res.status(404).json({ message: "Tema no encontrado" });
      }
  
      const resourceIndex = topic.resources.indexOf(resourceId);
      if (resourceIndex === -1) {
        return res.status(404).json({ message: "Recurso no encontrado en el tema" });
      }
  
      topic.resources.splice(resourceIndex, 1);
  
      await course.save();
  
      res.json({ message: "Recurso eliminado exitosamente del tema", course });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = deleteResourceFromTopic;