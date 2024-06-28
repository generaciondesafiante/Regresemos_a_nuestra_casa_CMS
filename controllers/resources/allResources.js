const { response } = require("express");
const Resource = require("../../models/Resources");
const User = require("../../models/User");

const allResources = async (req, res = response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const resources = user.admin
      ? await Resource.find()
      : await Resource.find({ visibility: "public" });

    const count = await Resource.countDocuments();

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
