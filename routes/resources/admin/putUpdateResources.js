const { Router } = require("express");
const updateResource = require("../../../controllers/resources/admin/updateResoruce");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const { validateResourceType, validateVisibilityType } = require("../../../middlewares/validate-resources");
const { check } = require("express-validator");
const { validateFields } = require("../../../middlewares/validate-fields");

const router = Router();

/**
 * @swagger
 * /api/resources/admin/updateResource/{userId}/{idResource}:
 *   put:
 *     tags: [Resources - Admin]
 *     summary: Actualizar un recurso existente (Admin)
 *     description: Actualiza un recurso existente. Solo usuarios administradores pueden actualizar recursos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador que realiza la actualización
 *       - in: path
 *         name: idResource
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del recurso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *                 description: URL de la miniatura del recurso
 *     responses:
 *       200:
 *         description: Recurso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Recurso actualizado exitosamente"
 *                 resource:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put(
  "/updateResource/:userId/:idResource",
  [
    check("userId", "El ID de usuario es obligatorio").not().isEmpty(),
    check("idResource", "El ID del recurso es obligatorio").not().isEmpty(),
    validateFields,
    validateUserAndRole,
    validateResourceType,
    validateVisibilityType
  ],
  updateResource
);

module.exports = router;
