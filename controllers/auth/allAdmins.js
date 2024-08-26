const User = require("../../models/User");

const allAdmins = async (req, res = response) => {
  const { id } = req.params;

  try {
    const adminUser = await User.findById(id);

    if (!adminUser || !adminUser.admin) {
      return res.status(403).json({
        ok: false,
        msg: "Acceso denegado",
      });
    }

    const admins = await User.find(
      { admin: true },
      {
        _id: 1,
        name: 1,
        lastname: 1,
        image: 1,
        email: 1,
        admin: true,
      }
    );

    if (!admins) {
      return res
        .status(404)
        .json({ message: "Administradores no encontrados" });
    }

    res.json({ admins });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = allAdmins;
