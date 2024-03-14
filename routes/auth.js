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
  userInformations,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
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
    check("phone", "El teléfono debe ser un número válido.")
      .optional()
      .isNumeric(),
    check("city", "La cuidad es obligatoria.").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.post("/userinformations", userInformations);
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
