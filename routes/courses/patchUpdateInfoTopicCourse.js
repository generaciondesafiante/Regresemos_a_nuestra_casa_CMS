const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const updateInfoTopicCourse = require("../../controllers/courses/topic/updateInfoTopicCourse");

const router = Router();

/**
 * @swagger
 * /api/course/{userId}/updateCourse/{courseId}/updateInfoTopicCourse/{topicId}:
 *   patch:
 *     summary: Update the name of a topic within a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID who owns the course.
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID where the topic belongs.
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameTopic:
 *                 type: string
 *                 example: "Nuevo Nombre del Tema"
 *                 description: New name for the topic.
 *     responses:
 *       200:
 *         description: Tema actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Curso o tema no encontrado
 *       500:
 *         description: Error actualizando el tema
 */

router.patch(
  "/:userId/updateCourse/:courseId/updateInfoTopicCourse/:topicId",
  validateUserAndRole,
  updateInfoTopicCourse
);
module.exports = router;
