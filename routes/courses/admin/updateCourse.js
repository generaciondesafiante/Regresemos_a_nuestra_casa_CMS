const { Router } = require("express");
const updateCourse = require("../../../controllers/courses/admin/updateCourse");
const { validateJWT } = require("../../../middlewares/validate-jwt");
const { validateCourseType } = require("../../../middlewares/validate-courseType");

const router = Router();

/**
 * @swagger
 * /api/courses/admin/{courseId}:
 *   patch:
 *     tags: [Courses - Admin]
 *     summary: Actualizar un curso existente (Admin)
 *     description: Actualiza la información de un curso existente. Requiere autenticación de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCourse:
 *                 type: string
 *                 description: Nuevo nombre del curso
 *               titleCourse:
 *                 type: string
 *                 description: Nuevo título del curso
 *               typeOfRoute:
 *                 type: string
 *                 enum: ["practices", "theoretical"]
 *                 description: Tipo de ruta del curso (práctico o teórico)
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
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
 *       404:
 *         description: Curso no encontrado
 */
router.patch(
  "/:courseId",
  [
    validateJWT,
    validateCourseType
  ],
  updateCourse
);

module.exports = router;
