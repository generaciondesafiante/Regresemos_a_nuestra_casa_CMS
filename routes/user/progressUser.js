const { Router } = require("express");
const {
  CourseProgress,
} = require("../../controllers/user/coursesProgressUser");

const router = Router();

/**
 * @swagger
 * /api/user/courseProgress:
 *   post:
 *     summary: Update course progress
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
 *         description: Progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 courseProgress:
 *                   type: object
 *                   properties:
 *                     course:
 *                       type: string
 *                     lastViewedTopic:
 *                       type: object
 *                       properties:
 *                         topicId:
 *                           type: string
 *                         lastViewedResource:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

router.post("/courseProgress", CourseProgress);

module.exports = router;
