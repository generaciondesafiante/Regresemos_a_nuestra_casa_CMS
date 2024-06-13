const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const createTopicToCourse = require("../../controllers/courses/createTopicCourse");

const router = Router();

/**
 * @swagger
 *  /api/course/topics/{userId}:
 *   post:
 *     summary: Add a new topic to a course
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
 *               - nameTopic
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *               nameTopic:
 *                 type: string
 *                 description: The name of the topic to be added
 *             example:
 *               courseId: 60c72b2f9b1e8c1b2c8d9d4f
 *               nameTopic: Introduction to Programming
 *     responses:
 *       201:
 *         description: The topic was successfully added to the course
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
 *                     resources: []
 *       400:
 *         description: Bad request
 *       404:
 *         description: Course not found
 */

router.post("/topics/:userId", validateUserAndRole, createTopicToCourse);
module.exports = router;
