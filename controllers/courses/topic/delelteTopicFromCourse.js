const Course = require("../../../models/Courses");

const deleteTopicFromCourse = async (req, res) => {
  const { idCourse, topicId } = req.params;

  try {
    const course = await Course.findById(idCourse);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    const topicIndex = course.topic.findIndex(
      (topic) => topic._id.toString() === topicId
    );
    if (topicIndex === -1) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }
    course.topic.splice(topicIndex, 1);

    await course.save();

    res.json({ message: "Tema eliminado exitosamente", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteTopicFromCourse;
