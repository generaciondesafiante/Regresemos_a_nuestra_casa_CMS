const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const updateInfoTopicCourse = require("../../controllers/courses/updateInfoTopicCourse");

const router = Router();

/**
 * @swagger
 * /api/course/{userId}/updateCourse/{courseId}/updateInfoTopicCourse/{topicId}:
 *   patch:
 *     summary: Actualiza el nombre de un tema
 *     tags: [Topics]
 *     parameters:
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
 *               nameTopic:
 *                 type: string
 *                 example: "Nuevo Nombre del Tema"
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
