const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const getAllAdmins = require("../../controllers/dashboardAdmin/allAdmins");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           description: Rol del usuario
 *         status:
 *           type: boolean
 *           description: Estado del usuario (activo/inactivo)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del usuario
 */
/**
 * @swagger
 * /api/admin/admins/{userId}:
 *   get:
 *     tags: [Admin]
 *     summary: Obtiene la lista de administradores con paginación
 *     description: Retorna una lista paginada de todos los administradores del sistema
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que realiza la solicitud
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Campo por el cual ordenar los resultados
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Orden de clasificación (ascendente o descendente)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda para filtrar por nombre o email
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de administradores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 docs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 totalDocs:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       500:
 *         description: Error del servidor
 */

router.get("/admins/:userId", [validateUserAndRole], getAllAdmins);

module.exports = router;
