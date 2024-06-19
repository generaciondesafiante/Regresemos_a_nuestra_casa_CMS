const { response } = require("express");
const triggerJWT = require("../../helpers/jwt");

const revalidateToken = async (req, res = response) => {
  const { name, email, uid, city, lastname, phone, country, admin } = req;

  //* generate a new JWT and return it in this request
  const token = await triggerJWT(
    name,
    email,
    uid,
    city,
    country,
    phone,
    lastname,
    admin
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
    admin,
  });
};

module.exports = revalidateToken;
