const User = require("../../models/User");

const changeAdminRole = async (req, res = response) => {
  const { email, admin } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado con este email",
      });
    }

    user.admin = admin;

    await user.save();

    const message = admin
      ? "Administrador agregado exitosamente"
      : "Administrador eliminado correctamente";

    res.json({
      msg: message,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el rol de administrador",
    });
  }
};

module.exports = { changeAdminRole };
