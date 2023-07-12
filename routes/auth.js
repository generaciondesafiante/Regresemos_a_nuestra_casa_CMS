// Rutas de usuarios /Auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const {
    createUser,
    loginUser,
    revalidateToken,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { course } = require("../controllers/course");

const router = Router();

router.post(
    "/new",
    [
        //middlewares
        check("name", "El nombre es obligatorio.").not().isEmpty(),
        check("email", "El correo electrónico  es obligatorio.").isEmail(),
        check(
            "password",
            "La contraseña debe tener mínimo 6 caracteres."
        ).isLength({
            min: 6,
        }),
        check("lastname", "El apellido  es obligatorio.").not().isEmpty(),
        check("country", "La país es obligatorio.").not().isEmpty(),
        check("city", "La cuidad es obligatoria.").not().isEmpty(),
        check("phone", "El teléfono es opcional.").not().isEmpty(),
        validateFields,
    ],
    createUser
);

router.post(
    "/",
    [
        //middlewares
        check("email", "El correo electrónico  es obligatorio.").isEmail(),
        check(
            "password",
            "La contraseña debe tener mínimo 6 caracteres."
        ).isLength({
            min: 6,
        }),
        validateFields,
    ],
    loginUser
);

router.get("/renew", validateJWT, revalidateToken);

router.get("/course", (req, res) => {
    res.json(course);
});

module.exports = router;
