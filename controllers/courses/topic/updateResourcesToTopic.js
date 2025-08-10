const Course = require("../../../models/Courses");
const Resource = require("../../../models/Resources");

const updateResourceInTopic = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { topicId, currentResourceId, newResourceId, isMandatory } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ error: "Curso no encontrado" });
    }

    const newResource = await Resource.findById(newResourceId);
    if (!newResource) {
      return res.status(404).send({ error: "Nuevo recurso no encontrado" });
    }

    const topic = course.topic.id(topicId);
    if (!topic) {
      return res.status(404).send({ error: "Tema no encontrado" });
    }

    const resourceIndex = topic.resources.findIndex(
      (existingResource) =>
        existingResource._id.toString() === currentResourceId
    );
    if (resourceIndex !== -1) {
      topic.resources[resourceIndex] = {
        _id: newResource._id,
        isMandatory,
      };

      await course.save();
      await course
        .populate({
          path: "topic.resources._id",
          model: "Resource",
        })
        .execPopulate();

      const detailedResources = topic.resources.map((res) => ({
        _id: {
          _id: res._id._id,
          resourceUrl: res._id.resourceUrl,
          title: res._id.title,
          description: res._id.description,
          typeResource: res._id.typeResource,
          visibility: res._id.visibility,
          miniaturaUrl: res._id.miniaturaUrl,
          createdAt: res._id.createdAt,
          updatedAt: res._id.updatedAt,
          isMandatory: res.isMandatory,
        },
      }));

      res.status(200).send(detailedResources);
    } else {
      res
        .status(404)
        .send({ error: "Recurso actual no encontrado en el tema" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = updateResourceInTopic;
