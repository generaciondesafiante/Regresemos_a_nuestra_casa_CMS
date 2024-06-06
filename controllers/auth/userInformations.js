const { response } = require("express");
const User = require("../../models/User");


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
        admin: user.admin,
        CourseProgress: user.CourseProgress,
        lastViewedVideos: user.lastViewedVideos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor comunícate con el administrador",
      });
    }
  };

  module.exports = userInformations