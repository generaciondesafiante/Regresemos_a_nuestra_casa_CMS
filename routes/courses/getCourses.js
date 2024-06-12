const { Router } = require("express");
const Courses = require("../../controllers/courses/courses");

const router = Router();

/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: Obtiene todos los cursos.
 *     tags: [Courses]
 *     description: Retorna una lista de todos los cursos con su información correspondiente.
 *     responses:
 *       200:
 *         description: OK. La solicitud se ha completado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */

router.get("/", Courses);
module.exports = router;
