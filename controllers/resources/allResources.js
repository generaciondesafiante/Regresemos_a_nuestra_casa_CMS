const { response } = require("express");
const Resource = require("../../models/Resources");

const allResources = async (req, res = response) => {
  try {
    const count = await Resource.countDocuments();

    const resources = await Resource.find();

    res.status(200).json({
      ok: true,
      count,
      resources,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

module.exports = allResources;
