const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const getAdminStats = require("../../controllers/dashboardAdmin/adminDashboard");

const router = Router();

/**
 * @swagger
 * /api/admin/stats/{userId}:
 *   get:
 *     tags: [Admin]
 *     summary: Obtiene estadísticas del dashboard de administrador
 *     description: Retorna estadísticas generales para el panel de administración
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario administrador que realiza la solicitud
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalStudents:
 *                   type: integer
 *                   description: Número total de estudiantes
 *                 totalResources:
 *                   type: integer
 *                   description: Número total de recursos
 *                 admins:
 *                   type: object
 *                   properties:
 *                     totalAdmins:
 *                       type: integer
 *                       description: Número total de administradores
 *                     latestAdmins:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                 latestCourses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameCourse:
 *                         type: string
 *                         description: Nombre del curso
 *                       titleCourse:
 *                         type: string
 *                         description: Título del curso
 *                       typeOfRoute:
 *                         type: string
 *                         description: Tipo de ruta del curso
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       500:
 *         description: Error del servidor
 */
router.get("/stats/:userId", [validateUserAndRole], getAdminStats);

module.exports = router;