const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const getTopicById = require("../../controllers/topics/getTopicById");


const router = Router();

/**
 * @swagger
 * /api/topics/{topicId}:
 *   get:
 *     summary: Obtiene un tema específico
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resourceId
 *             properties:
 *               resourceId:
 *                 type: string
 *                 description: ID del recurso a agregar
 *               isMandatory:
 *                 type: boolean
 *                 description: Indica si el recurso es obligatorio
 *                 default: false
 *     responses:
 *       200:
 *         description: Recurso agregado exitosamente al tema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 topic:
 *                   $ref: '#/components/schemas/Topic'
 *       400:
 *         description: Error en la solicitud (ej. recurso ya existe)
 *       404:
 *         description: Tema no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get(
    "/:userId/:topicId",
    validateUserAndRole,
    getTopicById
);

module.exports = router;