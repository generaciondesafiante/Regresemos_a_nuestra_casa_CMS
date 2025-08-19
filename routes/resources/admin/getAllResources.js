const { Router } = require("express");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const allResources = require("../../../controllers/resources/admin/allResources");
const queryParser = require("../../../middlewares/queryParser");
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
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID for authorization.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter resources by title.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of resources per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number to retrieve.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: "Field to sort by (e.g., 'createdAt', 'title')."
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: "Sort order ('asc' or 'desc')."
 *     responses:
 *       '200':
 *         description: Recursos obtenidos exitosamente
 *       '404':
 *         description: Recursos no encontrados
 */
router.get("/:userId", queryParser ,validateUserAndRole, allResources);

module.exports = router;
