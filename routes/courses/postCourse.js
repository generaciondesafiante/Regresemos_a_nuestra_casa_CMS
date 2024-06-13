const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const createCourse = require("../../controllers/courses/createCourse");
const { validateCourseType } = require("../../middlewares/validate-courseType");

const router = Router();

/**
 * @swagger
 * /api/course/{id}:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - nameCourse
 *               - titleCourse
 *               - typeOfRoute
 *             properties:
 *               nameCourse:
 *                 type: string
 *                 description: The name of the course
 *               titleCourse:
 *                 type: string
 *                 description: The title of the course
 *               typeOfRoute:
 *                 type: string
 *                 description: The type of route for the course
 *             example:
 *               nameCourse: Curso de Programación
 *               titleCourse: Aprende a Programar
 *               typeOfRoute: ruta-principal
 *     responses:
 *       201:
 *         description: The course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - nameCourse
 *                 - titleCourse
 *                 - typeOfRoute
 *               properties:
 *                 nameCourse:
 *                   type: string
 *                   description: The name of the course
 *                 titleCourse:
 *                   type: string
 *                   description: The title of the course
 *                 typeOfRoute:
 *                   type: string
 *                   description: The type of route for the course
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
 *             example:
 *               nameCourse: Nombre del curso
 *               titleCourse: Título del curso
 *               typeOfRoute: tipo de ruta
 *               topic: []
 *       400:
 *         description: Bad request
 */

router.post("/:id", validateUserAndRole, validateCourseType, createCourse);
module.exports = router;
