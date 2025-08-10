const { Router } = require("express");
const getCourses = require("../../controllers/courses/getCourses");

const router = Router();

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses with pagination
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter courses by name.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: true
 *         description: Number of courses per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Page number to retrieve.
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalCourses:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     hasPreviousPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Error retrieving courses
 */
router.get("/", getCourses);

module.exports = router;

