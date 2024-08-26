const nodemailer = require("nodemailer");
const User = require("../models/User");

const sendPasswordResetEmail = async (email, resetToken, currentUrl) => {
  const passKey = process.env.PASS_KEY_MAIL;
  console.log(passKey);

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "pruebasdanielmayo@gmail.com",
        pass: passKey,
      },
    });

    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const resetLink = `${currentUrl}/resetPassword/${user.id}/${resetToken}`;
    const userName =
      user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();

    await transporter.sendMail({
      from: user.email,
      to: email,
      subject: "Recuperación de Contraseña",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px;">
          <div style="text-align: center;">
            <img src="https://i.imgur.com/B0R1LHJ.png" alt="Logo Generación Desafiante" style="width: 150px; margin-bottom: 20px;" />
          </div>
          <h2 style="color: #333;">Restablecimiento de Contraseña</h2>
          <p style="font-size: 16px; color: #555;">
            ¡Hola <span style="color: #0f5765; font-weight: bold;">${userName}</span>! Esperamos que te encuentres bien.
          </p>
          <p style="font-size: 16px; color: #555;">
            Hemos recibido una solicitud para recuperar tu contraseña. Entendemos lo importante que es para ti acceder a tu cuenta de manera segura.
          </p>
          <p style="font-size: 16px; color: #555;">
            Haz clic en el botón a continuación para restablecerla:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #168991; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Restablecer Contraseña
            </a>
          </div>
          <p style="font-size: 14px; color: #777;">
            Si no solicitaste un cambio de contraseña, por favor ignora este correo electrónico.
          </p>
          <p style="font-size: 14px; color: #777;">
            Gracias,
            <br/>
            El equipo de Generación Desafiante
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};

module.exports = {
  sendPasswordResetEmail,
};
