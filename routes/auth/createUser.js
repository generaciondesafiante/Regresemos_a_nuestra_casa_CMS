const { Router } = require("express");
const { validateFields } = require("../../middlewares/validate-fields");
const createUser = require("../../controllers/auth/createUser");
const { check } = require("express-validator");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - lastname
 *         - country
 *         - city
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña (mínimo 6 caracteres)
 *         lastname:
 *           type: string
 *           description: Apellido del usuario
 *         country:
 *           type: string
 *           description: País de residencia
 *         city:
 *           type: string
 *           description: Ciudad de residencia
 *         phone:
 *           type: string
 *           description: Número de teléfono (opcional)
 */

/**
 * @swagger
 * /api/auth/new:
 *   post:
 *     tags: [Auth]
 *     summary: Crea un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
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
 *                   description: ID del usuario creado
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Correo electrónico del usuario
 *                 lastname:
 *                   type: string
 *                   description: Apellido del usuario
 *                 country:
 *                   type: string
 *                   description: País de residencia
 *                 city:
 *                   type: string
 *                   description: Ciudad de residencia
 *                 phone:
 *                   type: string
 *                   nullable: true
 *                   description: Número de teléfono (si fue proporcionado)
 *                 image:
 *                   type: string
 *                   format: uri
 *                   description: URL de la imagen de perfil
 *                 admin:
 *                   type: boolean
 *                   description: Indica si el usuario es administrador
 *                 token:
 *                   type: string
 *                   description: Token de autenticación JWT
 *       400:
 *         description: Error de validación o usuario ya existente
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
 *                   example: "Un usuario ya existe con este correo"
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/new",
  [
    //middlewares
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "El correo electrónico es obligatorio.").isEmail(),
    check("password", "La contraseña debe tener mínimo 6 caracteres.").isLength(
      {
        min: 6,
      }
    ),
    check("lastname", "El apellido es obligatorio.").not().isEmpty(),
    check("country", "El país es obligatorio.").not().isEmpty(),
    check("phone", "El teléfono debe ser un número válido.")
      .optional()
      .isNumeric(),
    check("city", "La ciudad es obligatoria.").not().isEmpty(),
    validateFields,
  ],
  createUser
);

module.exports = router;
