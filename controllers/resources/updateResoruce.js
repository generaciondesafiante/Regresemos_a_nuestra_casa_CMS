const { response } = require("express");
const Resource = require("../../models/Resources");

const updateResource = async (req, res = response) => {
  try {
    const { idResource } = req.params;
    const updates = req.body;

    const resource = await Resource.findByIdAndUpdate(
      idResource,
      { ...updates, updatedAt: Date.now() },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }

    res.status(200).json({
      message: "Recurso actualizado exitosamente",
      resource,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = updateResource;
