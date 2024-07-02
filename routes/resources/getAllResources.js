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
 * /api/resources/{userId}:
 *   get:
 *     summary: get all resources
 *     description: get all resources
 *     tags: [Resources]
 *     responses:
 *       '200':
 *         description: Recursos obtenidos exitosamente
 *       '404':
 *         description: Recursos no encontrados
 */
router.get("/:userId", allResources);

module.exports = router;
