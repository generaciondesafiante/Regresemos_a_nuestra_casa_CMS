const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const addResourceToTopic = require("../../controllers/courses/topic/addResourcesToTopic");

const router = Router();

/**
 * @swagger
 * /api/course/topics/resources/{userId}:
 *   post:
 *     summary: Add a new resource to a topic
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID (must be an admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - topicId
 *               - resourceId
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *               topicId:
 *                 type: string
 *                 description: The ID of the topic
 *               resourceId:
 *                 type: string
 *                 description: The ID of the resource to be added
 *             example:
 *               courseId: 60c72b2f9b1e8c1b2c8d9d4f
 *               topicId: 60c72b2f9b1e8c1b2c8d9d50
 *               resourceId: 60c72b2f9b1e8c1b2c8d9d51
 *     responses:
 *       201:
 *         description: The resource was successfully added to the topic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nameCourse:
 *                   type: string
 *                 titleCourse:
 *                   type: string
 *                 typeOfRoute:
 *                   type: string
 *                 topic:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameTopic:
 *                         type: string
 *                       resources:
 *                         type: array
 *                         items:
 *                           type: string
 *               example:
 *                 nameCourse: Curso de Programación
 *                 titleCourse: Aprende a Programar
 *                 typeOfRoute: ruta-principal
 *                 topic:
 *                   - nameTopic: Introduction to Programming
 *                     resources:
 *                       - 60c72b2f9b1e8c1b2c8d9d51
 *       400:
 *         description: Bad request
 *       404:
 *         description: Course or resource or topic not found
 */

router.post("/topics/resources/:userId", validateUserAndRole, addResourceToTopic);
module.exports = router;
