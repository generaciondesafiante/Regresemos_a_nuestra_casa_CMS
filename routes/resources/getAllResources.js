const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const allResources = require("../../controllers/resources/allResources");
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Endpoints for resource management
 */

/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: get all resources
 *     description: get all resources
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Recursos obtenidos exitosamente
 *       '404':
 *         description: Recursos no encontrados
 */
router.get("/:id", validateUserAndRole, allResources);

module.exports = router;
