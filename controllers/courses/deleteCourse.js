const Course = require("../../models/Courses");

const deleteCourse = async (req, res) => {
  const { idCourse } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(idCourse); 

    if (!deletedCourse) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    res.json({
      message: "Curso eliminado exitosamente",
      course: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCourse;
