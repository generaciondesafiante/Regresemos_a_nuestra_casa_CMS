const nodemailer = require("nodemailer");
const User = require("../models/User");

const sendPasswordChangeConfirmationEmail = async (email) => {
  const passKey = process.env.PASS_KEY_MAIL;
  const emailUser = process.env.EMAIL_USER;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: emailUser,
        pass: passKey,
      },
    });
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: "Confirmación de Cambio de Contraseña",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px;">
          <div style="text-align: center;">
            <img src="https://i.imgur.com/B0R1LHJ.png" alt="Logo" style="width: 150px; margin-bottom: 20px;" />
          </div>
          <h2 style="color: #333;">Confirmación de Cambio de Contraseña</h2>
          <p style="font-size: 16px; color: #555;">
            ¡Hola <span style="color:  #0f5765; font-weight: bold;">${
              user.name.charAt(0).toUpperCase() +
              user.name.slice(1).toLowerCase()
            }</span>! 
            Este es un mensaje para informarte que tu contraseña ha sido cambiada exitosamente.
          </p>
          <p style="font-size: 16px; color: #555;">
            Si no realizaste este cambio, por favor contacta a nuestro equipo de soporte inmediatamente.
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
    console.error("Error al enviar el correo de confirmación:", error);
  }
};

module.exports = sendPasswordChangeConfirmationEmail;
