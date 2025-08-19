const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate-jwt");
const revalidateToken = require("../../controllers/auth/revalidateToken");

const router = Router();

/**
 * @swagger
 * /api/auth/renew:
 *   get:
 *     tags: [Auth]
 *     summary: Renueva el token de autenticación
 *     description: Renueva el token JWT del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 uid:
 *                   type: string
 *                   description: ID del usuario
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                 lastname:
 *                   type: string
 *                   description: Apellido del usuario
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Correo electrónico del usuario
 *                 city:
 *                   type: string
 *                   description: Ciudad de residencia
 *                 country:
 *                   type: string
 *                   description: País de residencia
 *                 phone:
 *                   type: string
 *                   nullable: true
 *                   description: Número de teléfono
 *                 admin:
 *                   type: boolean
 *                   description: Indica si el usuario es administrador
 *                 token:
 *                   type: string
 *                   description: Nuevo token JWT para autenticación
 *       401:
 *         description: Token no válido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Token no válido"
 *       500:
 *         description: Error del servidor
 */
router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
