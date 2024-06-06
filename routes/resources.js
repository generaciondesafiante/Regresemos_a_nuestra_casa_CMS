const { Router } = require("express");
const { createResource } = require("../controllers/resources/createResource");
const {
  validateResourceType,
  validateVisibilityType,
} = require("../middlewares/validate-resources");
const { validateUserAndRole } = require("../middlewares/validate-rolUser");
const allResources = require("../controllers/resources/allResources");
const deleteResource = require("../controllers/resources/deleteResource");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Endpoints for resource management
 */

/**
 * @swagger
 * /api/resources/createResource/{id}:
 *   post:
 *     summary: Create a new resources
 *     description: Create a new resources
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
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
  "/createResource/:id",
  validateUserAndRole,
  validateResourceType,
  validateVisibilityType,
  createResource
);

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
