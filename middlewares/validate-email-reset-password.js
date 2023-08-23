const nodemailer = require("nodemailer");
const User = require("../models/User");

const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "pruebasdanielmayo@gmail.com",
      pass: "tfehpymjjkfwsagn",
    },
  });

  let user = await User.findOne({ email });
  const resetLink = `http://localhost:3000/resetPassword/${user.id}/${resetToken}`;
  await transporter.sendMail({
    from: user.email, //user email
    to: email,
    subject: "Restablecimiento de Contraseña",
    html: `¡Hola! Haga clic en el siguiente enlace para restablecer su contraseña: <br/>
        <a href="${resetLink}">${resetLink}</a>`,
  });
};

module.exports = {
  sendPasswordResetEmail,
};
