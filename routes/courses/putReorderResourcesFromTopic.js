const { Router } = require("express");
const reorderResources = require("../../controllers/courses/updateReorderResourceFromTopic");

const router = Router();

/**
 * @swagger
 * /api/course/{userId}/updateCourse/{courseId}/topics/{topicId}/reorderResources:
 *   put:
 *     summary: Reorganiza el orden de los recursos en un tema
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *       - in: path
 *         name: topicId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resourceId:
 *                 type: string
 *                 example: "610c8a8f1cfa5b0015e2c309"
 *                 description: ID del recurso que se desea reordenar
 *               newPosition:
 *                 type: integer
 *                 example: 1
 *                 description: Nueva posición del recurso (índice basado en cero)
 *     responses:
 *       200:
 *         description: Recurso reordenado exitosamente
 *       400:
 *         description: La posición especificada no es válida
 *       404:
 *         description: Curso, tema o recurso no encontrado
 *       500:
 *         description: Error reordenando recursos
 */
router.put(
  "/:userId/updateCourse/:courseId/topics/:topicId/reorderResources",
  reorderResources
);

module.exports = router;
