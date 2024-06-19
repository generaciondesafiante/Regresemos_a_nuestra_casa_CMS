const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const triggerJWT = require("../../helpers/jwt")


const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrecta",
      });
    }

    //* confirm the passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrecta",
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
      user.image,
      user.admin
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
      admin: user.admin,
      CourseProgress: user.CourseProgress,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Comunícate con el administrador del grupo.",
    });
  }
};

module.exports = loginUser;
