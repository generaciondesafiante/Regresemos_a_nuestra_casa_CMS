const { Router } = require("express");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const deleteResource = require("../../../controllers/resources/admin/deleteResource");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Endpoints for resource management
 */

/**
 * @swagger
 * /api/resources/deleteResource/{userId}/{idResource}:
 *   delete:
 *     summary: Delete a resource
 *     description: Delete a resource by its ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: userId
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
 *     responses:
 *       '200':
 *         description: Recurso eliminado exitosamente
 *       '404':
 *         description: Recurso no encontrado
 *       '500':
 *         description: Error en el servidor
 */

router.delete(
  "/deleteResource/:userId/:idResource",
  validateUserAndRole,
  deleteResource
);

module.exports = router;
