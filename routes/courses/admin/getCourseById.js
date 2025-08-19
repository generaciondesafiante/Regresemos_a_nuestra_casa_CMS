const { Router } = require("express");
const { check } = require("express-validator");
const getCourseById = require("../../../controllers/courses/admin/getCourseById");
const { validateFields } = require("../../../middlewares/validate-fields");

const router = Router();

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: The course description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some server error
 */
router.get(
  "/:id",
  [check("id", "No es un ID válido").isMongoId(), validateFields],
  getCourseById
);

module.exports = router;
