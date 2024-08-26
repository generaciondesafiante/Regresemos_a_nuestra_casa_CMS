const { response } = require("express");
const User = require("../../models/User");

const editInformationUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, admin, ...resto } = req.body;

  const currentUser = req.user;

  if (currentUser && currentUser.admin) {
    if (admin !== undefined) {
      resto.admin = admin;
    }
  } else {
    if (admin !== undefined) {
      return res.status(403).json({
        msg: "No tienes permiso para cambiar la propiedad admin.",
      });
    }
  }

  const user = await User.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "put API - UsuarioPut",
    id,
    user,
  });
};

module.exports = editInformationUser;
