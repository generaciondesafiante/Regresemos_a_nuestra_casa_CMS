const Course = require("../../models/Courses");

const createTopicToCourse = async (req, res) => {
  try {
    const { courseId, nameTopic } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ error: "Curso no encontrado" });
    }

    course.topic.push({ nameTopic, resources: [] });
    await course.save();

    res.status(201).send(course);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = createTopicToCourse;
