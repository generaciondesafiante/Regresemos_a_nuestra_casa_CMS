const { Router } = require("express");
const { validateFields } = require("../../middlewares/validate-fields");
const loginUser = require("../../controllers/auth/loginUser");
const { check } = require("express-validator");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña (mínimo 6 caracteres)
 */


/**
 * @swagger
 * /api/auth/:
 *   post:
 *     tags: [Auth]
 *     summary: Inicia sesión de usuario
 *     description: Autentica al usuario y devuelve un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 uid:
 *                   type: string
 *                   description: ID del usuario
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                 lastname:
 *                   type: string
 *                   description: Apellido del usuario
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Correo electrónico del usuario
 *                 city:
 *                   type: string
 *                   description: Ciudad de residencia
 *                 country:
 *                   type: string
 *                   description: País de residencia
 *                 phone:
 *                   type: string
 *                   nullable: true
 *                   description: Número de teléfono
 *                 image:
 *                   type: string
 *                   format: uri
 *                   description: URL de la imagen de perfil
 *                 admin:
 *                   type: boolean
 *                   description: Indica si el usuario es administrador
 *                 CourseProgress:
 *                   type: array
 *                   description: Progreso del usuario en los cursos
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Usuario o contraseña incorrecta"
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/",
  [
    check("email", "El correo electrónico es obligatorio.").isEmail(),
    check("password", "La contraseña debe tener mínimo 6 caracteres.").isLength(
      {
        min: 6,
      }
    ),
    validateFields,
  ],
  loginUser
);

module.exports = router;
