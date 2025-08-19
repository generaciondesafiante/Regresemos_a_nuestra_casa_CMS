const { Router } = require("express");
const getCourses = require("../../../controllers/courses/admin/getCourses");
const { validateJWT } = require("../../../middlewares/validate-jwt");

const router = Router();

/**
 * @swagger
 * /api/courses/admin:
 *   get:
 *     tags: [Courses - Admin]
 *     summary: Obtener lista de cursos con paginación (Admin)
 *     description: Retorna una lista paginada de cursos con opción de búsqueda. Requiere autenticación de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página actual
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Cantidad de elementos por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda opcional para filtrar cursos por nombre
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalCourses:
 *                       type: integer
 *                       description: Total de cursos que coinciden con el filtro
 *                     totalPages:
 *                       type: integer
 *                       description: Número total de páginas
 *                     currentPage:
 *                       type: integer
 *                       description: Página actual
 *                     hasPreviousPage:
 *                       type: boolean
 *                       description: Indica si hay página anterior
 *                     hasNextPage:
 *                       type: boolean
 *                       description: Indica si hay página siguiente
 *       400:
 *         description: Parámetros de paginación inválidos o faltantes
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       500:
 *         description: Error del servidor
 */
router.get("/", validateJWT, getCourses);

module.exports = router;

