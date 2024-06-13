const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const deleteTopicFromCourse = require("../../controllers/courses/delelteTopicFromCourse");

const router = Router();
/**
 * @swagger
 * /api/course/{userId}/{idCourse}/topic/{topicId}:
 *   delete:
 *     summary: Delete a topic by ID within a course
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
 *         description: El ID del tema a eliminar
 *     responses:
 *       200:
 *         description: El tema fue eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el tema fue eliminado
 *       404:
 *         description: Curso o tema no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete(
  "/:userId/:idCourse/topic/:topicId",
  validateUserAndRole,
  deleteTopicFromCourse
);

module.exports = router;
