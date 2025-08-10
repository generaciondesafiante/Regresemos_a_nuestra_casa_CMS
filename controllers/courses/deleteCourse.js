const Course = require("../../models/Courses");

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Buscar el curso por ID y eliminarlo
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    res.status(200).send({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = deleteCourse;
