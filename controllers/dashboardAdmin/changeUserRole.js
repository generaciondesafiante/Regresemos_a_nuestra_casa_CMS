const User = require("../../models/User");

const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    if (typeof isAdmin !== "boolean") {
      return res
        .status(400)
        .json({ message: "El valor de isAdmin debe ser un booleano." });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    user.admin = isAdmin;
    await user.save();

    res
      .status(200)
      .json({ message: isAdmin ? "Rol de administrador asignado." : "Administrador eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = changeUserRole;
