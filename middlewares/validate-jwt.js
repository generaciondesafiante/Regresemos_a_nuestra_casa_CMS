const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        });
    }

    try {
        const { uid, name, email, country, city, lastname, phone } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        req.email = email;
        req.country = country;
        req.country = city;
        req.lastname = lastname;
        req.phone = phone;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "TOKEN no valido!!",
        });
    }

    next();
};

module.exports = {
    validateJWT,
};
