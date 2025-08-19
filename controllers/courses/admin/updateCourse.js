const Course = require("../../../models/Courses");

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { nameCourse, titleCourse, typeOfRoute } = req.body;

    // Buscar el curso por ID y actualizarlo
    const course = await Course.findByIdAndUpdate(
      courseId,
      { nameCourse, titleCourse, typeOfRoute },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    res.status(200).send(course);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = updateCourse;
