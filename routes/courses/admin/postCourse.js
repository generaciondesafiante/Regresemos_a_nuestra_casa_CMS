const { Router } = require("express");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const createCourse = require("../../../controllers/courses/admin/createCourse");
const { validateCourseType } = require("./../../../middlewares/validate-courseType");

const router = Router();

/**
 * @swagger
 * /api/courses/admin/{userId}:
 *   post:
 *     tags: [Courses - Admin]
 *     summary: Crear un nuevo curso (Admin)
 *     description: Crea un nuevo curso en el sistema. Requiere autenticación de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador que realiza la acción
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
 *                 description: Nombre único del curso
 *               titleCourse:
 *                 type: string
 *                 description: Título descriptivo del curso
 *               typeOfRoute:
 *                 type: string
 *                 enum: ["practices", "theoretical"]
 *                 description: Tipo de ruta del curso (práctico o teórico)
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message describing the issue"
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 */
router.post("/:userId", validateUserAndRole, validateCourseType, createCourse);

module.exports = router;
