const { Router } = require("express");
const deleteCourse = require("../../controllers/courses/deleteCourse");

const router = Router();

/**
 * @swagger
 * /api/course/{courseId}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID to delete.
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Error deleting the course
 */
router.delete("/:courseId", deleteCourse);

module.exports = router;
