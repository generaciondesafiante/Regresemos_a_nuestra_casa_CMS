const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const validatePassword = async (req, res = response) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Contraseña válida",
    });
  } catch (error) {
    console.error("Error al validar la contraseña:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunícate con el administrador",
    });
  }
};

module.exports = validatePassword;
