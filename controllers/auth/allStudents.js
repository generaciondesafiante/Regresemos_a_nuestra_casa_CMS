const { response } = require("express");
const User = require("../../models/User");

const allStudents = async (req, res = response) => {
  const { id } = req.params;

  try {
    const adminUser = await User.findById(id);

    if (!adminUser || !adminUser.admin) {
      return res.status(403).json({
        ok: false,
        msg: "Acceso denegado",
      });
    }

    const studentCount = await User.countDocuments({ admin: false });

    res.status(200).json({
      ok: true,
      studentCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el  servidor",
    });
  }
};

module.exports = allStudents;
