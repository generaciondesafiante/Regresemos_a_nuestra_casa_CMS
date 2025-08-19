const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../../middlewares/validate-fields");
const editInformationUser = require("../../controllers/auth/editInfomationUser");
const { existeUsuarioPorId } = require("../../helpers/db-validators");
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nuevo nombre del usuario
 *         lastname:
 *           type: string
 *           description: Nuevo apellido del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Nuevo correo electrónico
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Nueva contraseña (mínimo 6 caracteres)
 *         city:
 *           type: string
 *           description: Nueva ciudad de residencia
 *         country:
 *           type: string
 *           description: Nuevo país de residencia
 *         phone:
 *           type: string
 *           description: Nuevo número de teléfono
 *         image:
 *           type: string
 *           format: uri
 *           description: URL de la nueva imagen de perfil
 *         admin:
 *           type: boolean
 *           description: Establecer como administrador (solo para super admins)
 */

/**
 * @swagger
 * /api/auth/edit-profile/{id}:
 *   put:
 *     tags: [Auth]
 *     summary: Actualiza la información de un usuario
 *     description: Permite actualizar la información del perfil de un usuario. Solo el propio usuario o un administrador pueden realizar esta acción.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Usuario actualizado correctamente"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación o ID inválido
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: Prohibido - No tienes permiso para realizar esta acción
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put(
  "/edit-profile/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateFields,
  ],
  editInformationUser
);

module.exports = router;
