const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
    //lo vamos a pedir x-token headers

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        });
    }

    try {
        const { uid, name, email } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        req.email = email;
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
