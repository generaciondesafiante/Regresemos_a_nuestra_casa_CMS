const Course = require("../../../models/Courses");
const Topic = require("../../../models/Topics");

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Buscar el curso
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    // Eliminar todos los topics asociados al curso
    await Topic.deleteMany({ _id: { $in: course.topics } });

    // Eliminar el curso
    await Course.findByIdAndDelete(courseId);

    res
      .status(200)
      .send({ message: "Course and associated topics deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = deleteCourse;
