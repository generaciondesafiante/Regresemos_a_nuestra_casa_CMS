const { Router } = require("express");
const router = Router();
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const changeUserRole = require("../../controllers/dashboardAdmin/changeUserRole");
const { validateFields } = require("../../middlewares/validate-fields");
const { check } = require("express-validator");

/**
 * @swagger
 * /api/admin/change-role/{userId}/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Actualiza el rol de un usuario entre administrador y usuario normal
 *     description: Permite cambiar el rol de un usuario entre administrador y usuario normal
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador que realiza la acción
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyo rol se va a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isAdmin
 *             properties:
 *               isAdmin:
 *                 type: boolean
 *                 description: true para hacer administrador, false para quitar permisos de administrador
 *                 example: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rol de usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rol de administrador asignado"
 *                   description: "Mensaje indicando el resultado de la operación ('Rol de administrador asignado' o 'Administrador eliminado')"
 *       400:
 *         description: Error de validación en los parámetros
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

router.put(
  "/change-role/:userId/:id",
  [
    validateUserAndRole,
    check("id", "No es un ID válido").isMongoId(),
    check("isAdmin", "El campo isAdmin es requerido").isBoolean(),
    validateFields,
  ],
  changeUserRole
);

module.exports = router;
