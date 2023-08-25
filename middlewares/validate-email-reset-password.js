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
  const resetLink = `https://regresemos-a-nuestra-casa-ui-hajm.vercel.app/resetPassword/${user.id}/${resetToken}`;
  await transporter.sendMail({
    from: user.email, //user email
    to: email,
    subject: "Restablecimiento de Contraseña",
    html: `¡Hola! esperamos que te encuentres bien. Hemos recibido una solicitud para recuperar la contraseña de tu cuenta  Entendemos lo importante que es para ti acceder a tu cuenta de manera segura.  <br/>Haz clic en el siguiente enlace para restablecer tu contraseña: <br/>
        <a href="${resetLink}">${resetLink}</a>`,
  });
};

module.exports = {
  sendPasswordResetEmail,
};
