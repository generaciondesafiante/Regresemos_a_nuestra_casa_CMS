const Course = require("../../../models/Courses");

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Filtrar solo los campos definidos en el body
    const fieldsToUpdate = {};
    const allowedFields = ["nameCourse", "titleCourse", "typeOfRoute", "isActive"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        fieldsToUpdate[field] = req.body[field];
      }
    });

    // Si no se envió ningún campo válido
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({ error: "No fields provided to update" });
    }

    // Actualizar curso
    const course = await Course.findByIdAndUpdate(courseId, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    res.status(200).send(course);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = updateCourse;
