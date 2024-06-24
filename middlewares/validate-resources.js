const VALID_RESOURCE_TYPES = ["video", "audio", "image", "pdf", "link"];
const VALID_VISIBILITY_TYPES = ["private", "visibleForward", "publico", "restrictedIncourse"];

const validateResourceType = (req, res, next) => {
  const { typeResource } = req.body;
  if (typeResource && !VALID_RESOURCE_TYPES.includes(typeResource)) {
    return res.status(400).json({
      error: "Tipo de recurso no válido",
      validTypes: VALID_RESOURCE_TYPES,
    });
  }
  next();
};

const validateVisibilityType = (req, res, next) => {
  const { visibility } = req.body;
  if (visibility && !VALID_VISIBILITY_TYPES.includes(visibility)) {
    return res.status(400).json({
      error: "Tipo de visibilidad no válido",
      validTypes: VALID_VISIBILITY_TYPES,
    });
  }
  next();
};

module.exports = {
  validateResourceType,
  validateVisibilityType,
};
