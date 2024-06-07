// controllers/resources/updateResource.js
const { response } = require("express");
const Resource = require("../../models/Resources");

const updateResource = async (req, res = response) => {
  try {
    const { idResource } = req.params;
    const updateData = req.body;

    // Agregar la fecha de actualización
    if (Object.keys(updateData).length > 0) {
      updateData.updatedAt = new Date();
    }

    const resource = await Resource.findByIdAndUpdate(idResource, updateData, { new: true });

    if (!resource) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }

    res.status(200).json({
      ok: true,
      message: "Recurso actualizado exitosamente",
      resource,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor",
    });
  }
};

module.exports = updateResource;
