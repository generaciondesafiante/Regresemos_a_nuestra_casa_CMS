const nodemailer = require('nodemailer');
const User = require("../models/User");

const sendPasswordResetEmail = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        // Configura aquí tus opciones de transporte de correo
        service: 'Gmail',
        auth: {
            user: 'pruebasdanielmayo@gmail.com', // Cambia esto por tu dirección de correo
            // pass: 'R3sidente10500**', // Cambia esto por tu contraseña de correo
            pass: 'tfehpymjjkfwsagn', // Cambia esto por tu contraseña de correo
        },
    });

    let user = await User.findOne({ email });
    const resetLink = `http://localhost:3000/resetPassword/${user.id}/${resetToken}`;
    // const resetLink = ``;
    console.log(user.email,resetToken)
    await transporter.sendMail({
        from: user.email, // Cambia esto por tu dirección de correo
        to: email,
        subject: 'Restablecimiento de Contraseña',
        html: `¡Hola! Haga clic en el siguiente enlace para restablecer su contraseña: <br/>
        <a href="${resetLink}">${resetLink}</a>`
    });
};

module.exports = {
    sendPasswordResetEmail
}
