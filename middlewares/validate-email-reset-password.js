const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        // Configura aquí tus opciones de transporte de correo
        service: 'Gmail',
        auth: {
            user: 'pruebasdanielmayo@gmail.com', // Cambia esto por tu dirección de correo
            pass: 'R3sidente10500', // Cambia esto por tu contraseña de correo
        },
    });

    // const resetLink = `http://localhost:8080/api/reset-password/${resetToken}`;
    const resetLink = `https://translate.google.com/?hl=es&sl=en&tl=es&text=she%20doesn%27t%20want%20your%20thumbs%20up%2C%20she%20wants%20your%C2%A0vote%C2%A0here.%C2%A0%F0%9F%A4%AD%0A&op=translate`;

    await transporter.sendMail({
        from: 'vargasmayo.c99@gmail.com', // Cambia esto por tu dirección de correo
        to: email,
        subject: 'Restablecimiento de Contraseña',
        html: `¡Hola! Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">${resetLink}</a>`
    });
};

module.exports = {
    sendPasswordResetEmail
}
