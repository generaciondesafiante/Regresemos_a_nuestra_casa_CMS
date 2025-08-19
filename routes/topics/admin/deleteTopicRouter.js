const { Router } = require("express");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const deleteTopic = require("../../../controllers/topics/admin/deleteTopic");

const router = Router();

/**
 * @swagger 
 * /api/topics/{topicId}:
 *   delete:
 *     summary: Elimina un tema y lo desvincula del curso
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema a eliminar
 *     responses:
 *       200:
 *         description: Tema eliminado correctamente
 *       404:
 *         description: Tema no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete(
  "/:userId/:topicId",
  validateUserAndRole,
  deleteTopic
);

module.exports = router;
