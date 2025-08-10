const { Router } = require("express");
const getTopicsByCourse = require("../../controllers/topics/getTopicsByCourse");
const queryParser = require("../../middlewares/queryParser");

const router = Router();

/**
 * @swagger
 * /api/course/{courseId}/topics:
 *   get:
 *     summary: Get all topics associated with a course
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID to get topics from.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter topics by name.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of topics per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number to retrieve.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: "Field to sort topics by (e.g., 'createdAt', 'nameTopic'). Defaults to 'createdAt'."
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: "Sort order ('asc' for ascending, 'desc' for descending). Defaults to 'desc'."
 *     responses:
 *       200:
 *         description: Topics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Topic'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalTopics:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     hasPreviousPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *       404:
 *         description: Course not found
 *       500:
 *         description: Error retrieving topics
 */
router.get("/:courseId", queryParser, getTopicsByCourse);

module.exports = router;
