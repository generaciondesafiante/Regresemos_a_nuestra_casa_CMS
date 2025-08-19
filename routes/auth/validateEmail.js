const { Router } = require("express");
const { validateFields } = require("../../middlewares/validate-fields");
const { check } = require("express-validator");
const emailUserPasswordForget = require("../../controllers/auth/emailUserPasswordForget");
const router = Router();

/**
 * @swagger
 * /api/auth/check-email:
 *   post:
 *     tags: [Auth]
 *     summary: Solicitar restablecimiento de contraseña
 *     description: Envía un correo electrónico con un enlace para restablecer la contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - currentUrl
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario que olvidó su contraseña
 *               currentUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL de la aplicación desde donde se realiza la solicitud
 *     responses:
 *       200:
 *         description: Correo de restablecimiento enviado exitosamente
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
 *                 token:
 *                   type: string
 *                   description: Token JWT temporal para operaciones de restablecimiento
 *       400:
 *         description: Error en la solicitud o usuario no encontrado
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
 *                   example: "El usuario no existe con ese email"
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/check-email",
  [
    check("email", "El correo electrónico es obligatorio.").isEmail(),
    check("currentUrl", "La URL actual es requerida").isURL(),
    validateFields,
  ],
  emailUserPasswordForget
);

module.exports = router;
