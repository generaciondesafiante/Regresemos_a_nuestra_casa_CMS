const { Router } = require("express");
const deleteCourse = require("../../controllers/courses/deleteCourse");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");

const router = Router();

/**
 * @swagger
 * /api/course/{userId}/{idCourse}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario (debe ser un administrador)
 *       - in: path
 *         name: idCourse
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del curso a eliminar
 *     responses:
 *       200:
 *         description: El curso fue eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el curso fue eliminado
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/:userId/:idCourse", validateUserAndRole, deleteCourse);

module.exports = router;
