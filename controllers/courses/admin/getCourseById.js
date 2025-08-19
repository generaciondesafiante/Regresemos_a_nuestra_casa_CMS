const Course = require("../../../models/Courses");

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate({
      path: "topics",
      populate: {
        path: "resources",
        model: "Resource",
      },
    });

    if (!course) {
      return res.status(404).send({
        error: "Curso no encontrado.",
      });
    }

    res.status(200).send(course);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getCourseById;
