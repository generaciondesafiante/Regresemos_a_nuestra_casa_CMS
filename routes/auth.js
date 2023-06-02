// Rutas de usuarios /Auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearUsuario,
    loginUsuario,
    revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { videos } = require("../controllers/videos");

const router = Router();

router.post(
    "/new",
    [
        //middlewares
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "el email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({
            min: 6,
        }),
        validarCampos,
    ],
    crearUsuario
);

router.post(
    "/",
    [
        //middlewares
        check("email", "el email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({
            min: 6,
        }),
        validarCampos,
    ],
    loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

router.get("/videos", (req, res) => {
    res.json(videos);
});

module.exports = router;
