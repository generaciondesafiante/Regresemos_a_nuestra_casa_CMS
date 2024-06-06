const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const triggerJWT = require("../../helpers/jwt")
const { response } = require("express");

const createUser = async (req, res = response) => {
  const { email, password, phone } = req.body;

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
    user.image =
      "http://somebooks.es/wp-content/uploads/2018/12/Poner-una-imagen-a-la-cuenta-de-usuario-en-Windows-10-000.png";
    user.phone = phone || null;
    user.admin = false;
    await user.save();

    //* trigger jwt
    const token = await triggerJWT(
      user.id,
      user.name,
      user.lastname,
      user.country,
      user.city,
      user.phone,
      user.image,
      user.admin
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
      admin: user.admin,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en nuestro servidor, comunícate con el administrador del grupo para tu registro.",
    });
  }
};

module.exports = createUser;
