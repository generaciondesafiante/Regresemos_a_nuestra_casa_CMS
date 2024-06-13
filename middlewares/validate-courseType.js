const VALID_COURSE_TYPES = ["strict", "flexible"];

const validateCourseType = (req, res, next) => {
  const { typeOfRoute } = req.body;
  if (typeOfRoute && !VALID_COURSE_TYPES.includes(typeOfRoute)) {
    return res.status(400).json({
      error: "Tipo de recurso no válido",
      validTypes: VALID_COURSE_TYPES,
    });
  }
  next();
};

module.exports = {
  validateCourseType,
};
