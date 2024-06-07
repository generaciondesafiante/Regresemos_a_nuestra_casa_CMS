const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const deleteResource = require("../../controllers/resources/deleteResource");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Endpoints for resource management
 */

/**
 * @swagger
 * /api/resources/deleteResource/{id}/{idResource}:
 *   delete:
 *     summary: Eliminar un recurso
 *     description: Elimina un recurso por su ID
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
 *     responses:
 *       '200':
 *         description: Recurso eliminado exitosamente
 *       '404':
 *         description: Recurso no encontrado
 *       '500':
 *         description: Error en el servidor
 */

router.delete(
  "/deleteResource/:id/:idResource",
  validateUserAndRole,
  deleteResource
);

module.exports = router;
