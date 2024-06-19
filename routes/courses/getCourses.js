const { Router } = require("express");
const Courses = require("../../controllers/courses/courses");

const router = Router();

/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: all Courses
 *     tags: [Courses]
 *     responses:
 *       201:
 *         description: Courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - nameCourse
 *                 - titleCourse
 *                 - typeOfRoute
 *                 - topic
 *               properties:
 *                 nameCourse:
 *                   type: string
 *                   description: El nombre del curso
 *                 titleCourse:
 *                   type: string
 *                   description: El título del curso
 *                 typeOfRoute:
 *                   type: string
 *                   description: El tipo de ruta para el curso
 *                 topic:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameTopic:
 *                         type: string
 *                         description: El nombre del tema
 *                       resources:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: ID del recurso asociado al tema
 *             example:
 *               nameCourse: Nombre del curso
 *               titleCourse: Título del curso
 *               typeOfRoute: Tipo de ruta
 *               topic: []
 *       400:
 *         description: Solicitud incorrecta
 */

router.get("/", Courses);
module.exports = router;
