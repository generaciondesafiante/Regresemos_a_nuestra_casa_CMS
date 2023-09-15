// Rutas de usuarios /Auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  revalidateToken,
  editInformationUser,
  emailUserPasswordForget,
  changePassword,
  validatePassword,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { course } = require("../controllers/course");
const { existeUsuarioPorId } = require("../helpers/db-validators");

const router = Router();

router.post(
  "/new",
  [
    //middlewares
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "El correo electrónico  es obligatorio.").isEmail(),
    check("password", "La contraseña debe tener mínimo 6 caracteres.").isLength(
      {
        min: 6,
      }
    ),
    check("lastname", "El apellido  es obligatorio.").not().isEmpty(),
    check("country", "El país es obligatorio.").not().isEmpty(),
    check("city", "La cuidad es obligatoria.").not().isEmpty(),
    check("phone", "El teléfono es opcional.").not().isEmpty(),
    check("image", "La imagen es opcional").not().isEmpty(),

    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    //middlewares
    check("email", "El correo electrónico  es obligatorio.").isEmail(),
    check("password", "La contraseña debe tener mínimo 6 caracteres.").isLength(
      {
        min: 6,
      }
    ),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidateToken);

router.put(
  "/edit-profile/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateFields,
  ],

  editInformationUser
);
router.put(
  "/change-password/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateFields,
  ],

  changePassword
);
router.post(
  "/validate-password/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
  ],

  validatePassword
);
router.post(
  "/check-email",
  [
    //middlewares
    check("email", "El correo electrónico  es obligatorio.").isEmail(),

    validateFields,
  ],
  emailUserPasswordForget
);

module.exports = router;
