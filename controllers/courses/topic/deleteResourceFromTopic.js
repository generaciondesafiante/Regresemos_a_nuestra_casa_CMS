const Course = require("../../../models/Courses");

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
    topic.resources = topic.resources.filter(
      (existingResource) => existingResource._id.toString() !== resourceId
    );

    await course.save();

    await course
      .populate({
        path: "topic.resources._id",
        model: "Resource",
      })
      .execPopulate();

    res.status(200).send(topic.resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteResourceFromTopic;
