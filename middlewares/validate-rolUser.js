const User = require("../models/User");

const validateUserAndRole = async (req, res = response, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!user.admin) {
      return res
        .status(403)
        .json({ error: "No autorizado. Se requiere rol de administrador" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error en la validación del usuario" });
  }
};

module.exports = { validateUserAndRole };
