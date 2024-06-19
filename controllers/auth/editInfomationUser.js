const { response } = require("express");
const User = require("../../models/User");


const editInformationUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  const user = await User.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - UsuarioPut",
    id,
    user,
  });
};

module.exports = editInformationUser;
