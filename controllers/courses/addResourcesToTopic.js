const Course = require("../../models/Courses");
const Resource = require("../../models/Resources");

const addResourceToTopic = async (req, res) => {
  try {
    const { courseId, topicId, resourceId, isCompleted } = req.body;

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

    if (
      topic.resources.some(
        (existingResource) => existingResource._id.toString() === resourceId
      )
    ) {
      return res
        .status(400)
        .send({ error: "El recurso ya está agregado a este tema" });
    }

    if (course.typeOfRoute === "strict" && typeof isCompleted !== "boolean") {
      return res.status(400).send({
        error:
          "Para cursos flexibles, el valor de isCompleted debe ser obligatorio",
      });
    }

    topic.resources.push({ _id: resource._id, isCompleted });

    await course.save();

    res.status(201).send(course);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = addResourceToTopic;
