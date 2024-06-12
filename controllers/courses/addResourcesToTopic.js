const Course = require("../../models/Courses");
const Resource = require("../../models/Resources");

const addResourceToTopic = async (req, res) => {
  try {
    const { courseId, topicId, resourceId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ error: "Curso no encontrado" });
    }

    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).send({ error: "Recurso no encontrado" });
    }

    const topic = course.topic.id(topicId);
    if (!topic) {
      return res.status(404).send({ error: "Tema no encontrado" });
    }

    if (topic.resources.includes(resourceId)) {
      return res
        .status(400)
        .send({ error: "El recurso ya está agregado a este tema" });
    }

    topic.resources.push(resource._id);
    await course.save();

    res.status(201).send(course);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = addResourceToTopic;
