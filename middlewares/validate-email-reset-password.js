const nodemailer = require("nodemailer");
const User = require("../models/User");

const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "pruebasdanielmayo@gmail.com",
        pass: "tfehpymjjkfwsagn",
      },
    });

    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const resetLink = `https://regresemos-a-casa-ui.vercel.app/forgetpassword/${user.id}/${resetToken}`;
    await transporter.sendMail({
      from: user.email, 
      to: email,
      subject: "Restablecimiento de Contraseña",
      html: `¡Hola! esperamos que te encuentres bien. <br/>Hemos recibido una solicitud para recuperar tu contraseña. Entendemos lo importante que es para ti acceder a tu cuenta de manera segura.  <br/>Haz clic en el siguiente enlace para restablecerla: <br/>
          <a href="${resetLink}">${resetLink}</a>`,
    });

    console.log("Correo electrónico enviado correctamente.");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};

module.exports = {
  sendPasswordResetEmail,
};
