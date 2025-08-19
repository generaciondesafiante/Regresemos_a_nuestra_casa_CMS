const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const findStudent = require("../../controllers/dashboardAdmin/findStudent");

const router = Router();

/**
 * @swagger
 * /api/admin/find/{userId}/{searchTerm}:
 *   get:
 *     tags: [Admin]
 *     summary: Busca un estudiante por ID o email
 *     description: Busca un estudiante por su ID de MongoDB o dirección de correo electrónico (búsqueda insensible a mayúsculas/minúsculas)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador que realiza la búsqueda
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB o email del estudiante a buscar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estudiante encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/find/:userId/:searchTerm", validateUserAndRole, findStudent);

module.exports = router;
