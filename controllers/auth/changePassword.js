const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const sendPasswordChangeConfirmationEmail = require("../../middlewares/confirm-mail-changePassword");

const changePassword = async (req, res = response) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    // Validate if the user exists (you can add more validations here
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generate the hash of the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user password
    user.password = hashedPassword;
    await user.save();
    //Here you can perform other actions like sending an email or generating a JWT token if needed
    await sendPasswordChangeConfirmationEmail(user.email);

    res.json({
      msg: "Contraseña actualizada exitosamente",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
};

module.exports = changePassword;
