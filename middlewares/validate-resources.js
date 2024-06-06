const VALID_RESOURCE_TYPES = ["video", "audio", "image", "pdf", "enlace"];
const VALID_VISIBILITY_TYPES = ["onlyAdmin", "onlyLessons", "all"];

const validateResourceType = (req, res, next) => {
  const { typeResource } = req.body;

  if (!VALID_RESOURCE_TYPES.includes(typeResource)) {
    return res.status(400).json({
      error: "Tipo de recurso no válido",
      validTypes: VALID_RESOURCE_TYPES,
    });
  }

  next();
};

const validateVisibilityType = (req, res, next) => {
  const { visibility } = req.body;

  if (!VALID_VISIBILITY_TYPES.includes(visibility)) {
    return res.status(400).json({
      error: "Tipo de visibilidad no válido",
      validVisibility: VALID_VISIBILITY_TYPES,
    });
  }

  next();
};

module.exports = {
  validateResourceType,
  validateVisibilityType,
};
