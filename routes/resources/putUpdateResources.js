const { Router } = require("express");
const updateResource = require("../../controllers/resources/updateResoruce");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const { validateResourceType, validateVisibilityType } = require("../../middlewares/validate-resources");

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Endpoints for resource management
 */

/**
 * @swagger
 * /api/resources/updateResource/{id}/{idResource}:
 *   put:
 *     summary: Actualizar un recurso
 *     description: Actualiza un recurso existente
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - in: path
 *         name: idResource
 *         required: true
 *         description: ID del recurso
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resourceUrl:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               typeResource:
 *                 type: string
 *               visibility:
 *                 type: string
 *               miniaturaUrl:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Recurso actualizado exitosamente
 *       '404':
 *         description: Recurso no encontrado
 *       '500':
 *         description: Error en el servidor
 */
router.put(
  "/updateResource/:id/:idResource",
  validateUserAndRole,
  validateResourceType,
  validateVisibilityType,
  updateResource
);

module.exports = router;
