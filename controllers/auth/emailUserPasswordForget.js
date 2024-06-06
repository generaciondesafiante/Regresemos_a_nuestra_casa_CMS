const { response } = require("express");
const jsonWebToken = require("jsonwebtoken");
const User = require("../../models/User");
const triggerJWT = require("../../helpers/jwt");
const {
  sendPasswordResetEmail,
} = require("../../middlewares/validate-email-reset-password");

const emailUserPasswordForget = async (req, res = response) => {
  const { id } = req.params;

  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    const token = await triggerJWT(
      user.id,
      user.name,
      user.email,
      user.ciy,
      user.country,
      user.lastname,
      user.phone,
      user.image
    );
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usario no existe con ese email",
      });
    }
    const resetToken = jsonWebToken.sign({ userId: id }, "secret_key", {
      expiresIn: "1h",
    });
    await sendPasswordResetEmail(user.email, resetToken);
    //*Generar nuestro Jwt
    res.json({
      ok: true,
      uid: user.id,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunícate con el administrador",
    });
  }
};

module.exports = emailUserPasswordForget;
