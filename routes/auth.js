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
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "el email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({
            min: 6,
        }),
        check("lastname", "El apellido  es obligatorio").not().isEmpty(),
        check("country", "La pais es obligatorio").not().isEmpty(),
        check("city", "La cuidad es obligatorio").not().isEmpty(),
        check("phone", "La cuidad es obligatorio").not().isEmpty(),
        validateFields,
    ],
    createUser
);

router.post(
    "/",
    [
        //middlewares
        check("email", "el email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({
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
