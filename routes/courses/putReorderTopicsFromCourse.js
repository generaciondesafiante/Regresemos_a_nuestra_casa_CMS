const { Router } = require("express");
const updateReorderTopicsFromCourse = require("../../controllers/courses/topic/updateReorderTopicFromCourse");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");

const router = Router();

/**
 * @swagger
 * /api/course/{userId}/updateCourse/{courseId}/reorderTopics:
 *   put:
 *     summary: Rearrange the order of topics in a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario propietario del curso
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topicId:
 *                 type: string
 *                 example: "60f9e5215c25b837e4e9a1b1"
 *                 description: ID del tema que se desea reordenar
 *               newPosition:
 *                 type: integer
 *                 example: 1
 *                 description: Nueva posición del tema (índice basado en cero)
 *     responses:
 *       200:
 *         description: Tema reordenado exitosamente
 *       400:
 *         description: La posición especificada no es válida
 *       404:
 *         description: Curso o tema no encontrado
 *       500:
 *         description: Error reordenando temas
 */


router.put(
  "/:userId/updateCourse/:courseId/reorderTopics",
  validateUserAndRole,
  updateReorderTopicsFromCourse
);

module.exports = router;
