const { Router } = require("express");
const deleteCourse = require("../../../controllers/courses/admin/deleteCourse");
const { validateJWT } = require("../../../middlewares/validate-jwt");

const router = Router();

/**
 * @swagger
 * /api/courses/admin/{courseId}:
 *   delete:
 *     tags: [Courses - Admin]
 *     summary: Eliminar un curso (Admin)
 *     description: Elimina un curso del sistema. Requiere autenticación de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso a eliminar
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course deleted successfully"
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Course not found"
 *       500:
 *         description: Error del servidor
 */
router.delete("/:courseId", validateJWT, deleteCourse);

module.exports = router;
