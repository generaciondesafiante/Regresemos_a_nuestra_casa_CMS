const { Router } = require("express");
const {
  lastViewedResource,
} = require("../../controllers/user/lastViewedResourceUser");

const router = Router();

/**
 * @swagger
 * /lastViewedResource:
 *   put:
 *     summary: Save the last viewed resource
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               topicId:
 *                 type: string
 *               resourceId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Last viewed resource saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lastViewedResource:
 *                   type: object
 *                   properties:
 *                     courseName:
 *                       type: string
 *                     courseId:
 *                       type: string
 *                     topicName:
 *                       type: string
 *                     topicId:
 *                       type: string
 *                     resource:
 *                       $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid user ID format
 *       404:
 *         description: User, Course, Topic, or Resource not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         resourceUrl:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         typeResource:
 *           type: string
 *         visibility:
 *           type: string
 *         miniaturaUrl:
 *           type: string
 */

router.put("/lastViewedResource", lastViewedResource);

module.exports = router;
