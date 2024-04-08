const jwt = require("jsonwebtoken");

const triggerJWT = (uid, name, email, lastname, country, city, phone,admin) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name, email, lastname, country, city, phone,admin };

        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn: "2h",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                }

                resolve(token);
            }
        );
    });
};

module.exports = {
    triggerJWT,
};
