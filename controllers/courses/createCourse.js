const Course = require("../../models/Courses");

const createCourse = async (req, res) => {
  try {
    const { nameCourse, titleCourse, typeOfRoute } = req.body;
    const course = new Course({
      nameCourse,
      titleCourse,
      typeOfRoute,
    });
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = createCourse;
