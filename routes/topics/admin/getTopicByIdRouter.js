const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../../../middlewares/validate-fields");
const getTopicById = require("../../../controllers/topics/admin/getTopicById");
const queryParser = require("../../../middlewares/queryParser");

const router = Router();

/**
 * @swagger
 * /api/topics/admin/{userId}/{topicId}:
 *   get:
 *     tags: [Topics - Admin]
 *     summary: Obtener un tema por ID (Admin)
 *     description: Obtiene la información detallada de un tema específico incluyendo sus recursos con paginación. Requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que realiza la solicitud
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema a consultar
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de recursos por página
 *     responses:
 *       200:
 *         description: Tema encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topic:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     nameTopic:
 *                       type: string
 *                     resources:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Resource'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     hasPreviousPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *                     limit:
 *                       type: integer
 *       400:
 *         description: ID de tema no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Topic ID is required"
 *       404:
 *         description: Tema no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Topic not found"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get(
  "/:userId/:topicId",
  [
    check('userId', 'El ID de usuario es obligatorio').not().isEmpty(),
    check('topicId', 'El ID del tema es obligatorio').not().isEmpty(),
    validateFields,
    queryParser
  ],
  getTopicById
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         typeResource:
 *           type: string
 */

module.exports = router;