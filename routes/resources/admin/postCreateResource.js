const { Router } = require("express");
const {
  createResource,
} = require("../../../controllers/resources/admin/createResource");
const {
  validateResourceType,
  validateVisibilityType,
} = require("../../../middlewares/validate-resources");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const router = Router();

/**
 * @swagger
 * /api/resources/admin/createResource/{userId}:
 *   post:
 *     tags: [Resources - Admin]
 *     summary: Crear un nuevo recurso (Admin)
 *     description: Crea un nuevo recurso en el sistema. Requiere autenticación de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador que crea el recurso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resourceUrl
 *               - title
 *               - typeResource
 *               - visibility
 *             properties:
 *               resourceUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL del recurso
 *               title:
 *                 type: string
 *                 description: Título del recurso
 *               description:
 *                 type: string
 *                 description: Descripción detallada del recurso
 *               typeResource:
 *                 type: string
 *                 enum: [video, document, link, image, other]
 *                 description: Tipo de recurso
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *                 description: Visibilidad del recurso
 *               miniaturaUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL de la miniatura del recurso (opcional)
 *     responses:
 *       201:
 *         description: Recurso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message describing the issue"
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/createResource/:userId",
  [
    validateUserAndRole,
    validateResourceType,
    validateVisibilityType
  ],
  createResource
);

module.exports = router;
