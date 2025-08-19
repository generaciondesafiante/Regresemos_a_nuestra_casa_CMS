const { Router } = require("express");
const { check } = require("express-validator");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const { validateFields } = require("../../../middlewares/validate-fields");
const deleteTopic = require("../../../controllers/topics/admin/deleteTopic");

const router = Router();

/**
 * @swagger
 * /api/topics/admin/{userId}/{topicId}:
 *   delete:
 *     tags: [Topics - Admin]
 *     summary: Eliminar un tema (Admin)
 *     description: Elimina un tema existente y lo desvincula de todos los cursos que lo contengan. Requiere autenticación de administrador.
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
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema a eliminar
 *     responses:
 *       200:
 *         description: Tema eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tema eliminado correctamente"
 *       400:
 *         description: Error en la solicitud o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Se requiere topicId"
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       404:
 *         description: Tema no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Tema no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error al eliminar el tema"
 */
router.delete(
  "/:userId/:topicId",
  [
    check('userId', 'El ID de usuario es obligatorio').not().isEmpty(),
    check('topicId', 'El ID del tema es obligatorio').not().isEmpty(),
    validateFields,
    validateUserAndRole
  ],
  deleteTopic
);

module.exports = router;
