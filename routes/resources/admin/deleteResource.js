const { Router } = require("express");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const deleteResource = require("../../../controllers/resources/admin/deleteResource");
const { check } = require("express-validator");
const { validateFields } = require("../../../middlewares/validate-fields");

const router = Router();

/**
 * @swagger
 * /api/resources/admin/deleteResource/{userId}/{idResource}:
 *   delete:
 *     tags: [Resources - Admin]
 *     summary: Eliminar un recurso (Admin)
 *     description: Elimina un recurso del sistema. Requiere autenticación de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador que realiza la acción
 *       - in: path
 *         name: idResource
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del recurso a eliminar
 *     responses:
 *       200:
 *         description: Recurso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recurso eliminado exitosamente"
 *       400:
 *         description: Error en la solicitud o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message describing the issue"
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       404:
 *         description: Recurso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Recurso no encontrado"
 *       500:
 *         description: Error del servidor
 */
router.delete(
  "/deleteResource/:userId/:idResource",
  [
    check("userId", "El ID de usuario es obligatorio").not().isEmpty(),
    check("idResource", "El ID del recurso es obligatorio").not().isEmpty(),
    validateFields,
    validateUserAndRole
  ],
  deleteResource
);

module.exports = router;
