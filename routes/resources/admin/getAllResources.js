const { Router } = require("express");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const allResources = require("../../../controllers/resources/admin/allResources");
const queryParser = require("../../../middlewares/queryParser");
const router = Router();

/**
 * @swagger
 * /api/resources/admin/{userId}:
 *   get:
 *     tags: [Resources - Admin]
 *     summary: Obtener todos los recursos con paginación (Admin)
 *     description: Obtiene una lista paginada de recursos. Los administradores ven todos los recursos, los usuarios normales solo ven los públicos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que realiza la consulta
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de elementos por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda para filtrar por título o descripción
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "createdAt"
 *         description: |
 *           Campo por el cual ordenar.
 *           Prefijo - para orden descendente.
 *           Ejemplos: "createdAt" o "-createdAt"
 *       - in: query
 *         name: visibility
 *         schema:
 *           type: string
 *           enum: [public, private]
 *         description: Filtrar por visibilidad del recurso
 *     responses:
 *       200:
 *         description: Lista de recursos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 resources:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resource'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     itemsPerPage:
 *                       type: integer
 *       401:
 *         description: No autorizado - Se requiere autenticación
 *       403:
 *         description: Prohibido - El usuario no tiene permisos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get(
  "/:userId",
  [
    queryParser,
    validateUserAndRole
  ],
  allResources
);

module.exports = router;
