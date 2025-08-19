const { Router } = require("express");
const userInformations = require("../../controllers/auth/userInformations");

const router = Router();

/**
 * @swagger
 * /api/auth/userinformations:
 *   post:
 *     tags: [Auth]
 *     summary: Obtiene la información detallada de un usuario
 *     description: Retorna la información completa del usuario especificado por su ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del usuario a consultar
 *     responses:
 *       200:
 *         description: Información del usuario obtenida correctamente
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
 *                 image:
 *                   type: string
 *                   format: uri
 *                   nullable: true
 *                   description: URL de la imagen de perfil
 *                 admin:
 *                   type: boolean
 *                   description: Indica si el usuario es administrador
 *                 CourseProgress:
 *                   type: array
 *                   description: Progreso del usuario en los cursos
 *                 lastViewedResources:
 *                   type: array
 *                   description: Últimos recursos vistos por el usuario
 *       400:
 *         description: Usuario no encontrado
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
 *                   example: "El usuario no existe con ese ID"
 *       500:
 *         description: Error del servidor
 */
router.post("/userinformations", userInformations);

module.exports = router;
