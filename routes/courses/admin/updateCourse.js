const { Router } = require("express");
const updateCourse = require("../../../controllers/courses/admin/updateCourse");

const router = Router();

/**
 * @swagger
 * /api/courses/{courseId}:
 *   patch:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCourse:
 *                 type: string
 *               titleCourse:
 *                 type: string
 *               typeOfRoute:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       400:
 *         description: Error updating the course
 */
router.patch("/:courseId", updateCourse);

module.exports = router;
