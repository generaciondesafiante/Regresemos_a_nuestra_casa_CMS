const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const deleteResourceFromTopic = require("../../controllers/courses/deleteResourceFromTopic");

const router = Router();

/**
 * @swagger
 * /api/course/{userId}/{idCourse}/topic/{topicId}/resource/{resourceId}:
 *   delete:
 *     summary: Delete a resource by ID within a course topic
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario administrador
 *       - in: path
 *         name: idCourse
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del curso
 *       - in: path
 *         name: topicId
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del tema
 *       - in: path
 *         name: resourceId
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del recurso a eliminar
 *     responses:
 *       200:
 *         description: El recurso fue eliminado exitosamente del tema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el recurso fue eliminado
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso, tema o recurso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete(
  "/:userId/:idCourse/topic/:topicId/resource/:resourceId",
  validateUserAndRole,
  deleteResourceFromTopic
);

module.exports = router;
