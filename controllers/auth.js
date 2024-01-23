const { response } = require("express");
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const User = require("../models/User");
const { triggerJWT } = require("../helpers/jwt");
const {
  sendPasswordResetEmail,
} = require("../middlewares/validate-email-reset-password");

// register
const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con este correo",
      });
    }

    user = new User(req.body);

    //encrypt password with bcryptjs
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //* trigger jwt
    const token = await triggerJWT(
      user.id,
      user.name,
      user.lastname,
      user.country,
      user.city,
      user.phone,
      user.image
    );

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email,
      lastname: user.lastname,
      country: user.country,
      city: user.city,
      phone: user.phone,
      image: user.image,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

// get information user
const userInformations = async (req, res = response) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usario no existe con ese ID",
      });
    }
    res.json({
      ok: true,
      uid: user.id,
      lastname: user.lastname,
      name: user.name,
      email: user.email,
      city: user.city,
      country: user.country,
      phone: user.phone,
      image: user.image,
      CourseProgress: user.CourseProgress,
      lastViewedInfo: user.lastViewedInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunícate con el administrador",
    });
  }
};
// Login

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usario no existe con ese email",
      });
    }

    //* confirm the passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    //*Generate our Jwt

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

    res.json({
      ok: true,
      uid: user.id,
      lastname: user.lastname,
      name: user.name,
      email: user.email,
      city: user.city,
      country: user.country,
      phone: user.phone,
      image: user.image,
      CourseProgress: user.CourseProgress,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunícate con el administrador",
    });
  }
};

// renew token

const revalidateToken = async (req, res = response) => {
  const { name, email, uid, city, lastname, phone, country } = req;

  //* generate a new JWT and return it in this request
  const token = await triggerJWT(
    name,
    email,
    uid,
    city,
    country,
    phone,
    lastname
  );

  res.json({
    ok: true,
    uid,
    name,
    email,
    city,
    lastname,
    country,
    phone,
    token,
  });
};
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

const validatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Contraseña válida",
    });
  } catch (error) {
    console.error("Error al validar la contraseña:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunícate con el administrador",
    });
  }
};

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
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunícate con el administrador",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
  editInformationUser,
  emailUserPasswordForget,
  changePassword,
  validatePassword,
  userInformations,
};
