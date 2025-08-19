const { Router } = require("express");
const { check } = require("express-validator");
const { existeUsuarioPorId } = require("../../helpers/db-validators");
const validatePassword = require("../../controllers/auth/validatePassword");

const router = Router();

/**
 * @swagger
 * /api/auth/validate-password/{id}:
 *   post:
 *     tags: [Auth]
 *     summary: Validar la contraseña actual de un usuario
 *     description: Verifica si la contraseña proporcionada coincide con la del usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Contraseña actual del usuario
 *     responses:
 *       200:
 *         description: Contraseña válida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Contraseña válida"
 *       400:
 *         description: Contraseña incorrecta o ID inválido
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
 *                   example: "Contraseña incorrecta"
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/validate-password/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
  ],
  validatePassword
);

module.exports = router;
