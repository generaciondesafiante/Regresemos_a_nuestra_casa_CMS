const { Router } = require("express");
const {
  createResource,
} = require("../../controllers/resources/createResource");
const {
  validateResourceType,
  validateVisibilityType,
} = require("../../middlewares/validate-resources");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Endpoints for resource management
 */

/**
 * @swagger
 * /api/resources/createResource/{userId}:
 *   post:
 *     summary: Create a new resources
 *     description: Create a new resources
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario
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
 *       '201':
 *         description: Recurso creado exitosamente
 *       '400':
 *         description: Error de solicitud inválida
 */

router.post(
  "/createResource/:userId",
  validateUserAndRole,
  validateResourceType,
  validateVisibilityType,
  createResource
);

module.exports = router;
