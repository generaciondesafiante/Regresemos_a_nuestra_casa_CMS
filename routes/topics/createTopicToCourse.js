const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const createAndAssociateTopic = require("../../controllers/topics/createTopicCourse");


const router = Router();

/**
 * @swagger
 * /api/course/{userId}/createTopic/{courseId}:
 *   post:
 *     summary: Create a new topic and associate it with a course
 *     tags: [Topics]
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
 *         description: Course ID to which the topic will be associated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameTopic:
 *                 type: string
 *                 example: "Nombre del Tema"
 *                 description: Name of the topic to create.
 *     responses:
 *       201:
 *         description: Topic created and associated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topic:
 *                   $ref: '#/components/schemas/Topic'
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Error creating the topic
 */
router.post(
  "/:userId/createTopic",
  validateUserAndRole,
  createAndAssociateTopic
);

module.exports = router;
