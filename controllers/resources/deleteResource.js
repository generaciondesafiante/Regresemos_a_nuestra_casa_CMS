const { response } = require("express");
const Resource = require("../../models/Resources");

const deleteResource = async (req, res = response) => {
  try {
    const { idResource } = req.params;
    const resource = await Resource.findById(idResource);

    if (!resource) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }

    await resource.deleteOne();
    res.status(200).json({ message: "Recurso eliminado exitosamente" });
  } catch {
    res.status(400).json({ message: error.message });
  }
};

module.exports = deleteResource;
