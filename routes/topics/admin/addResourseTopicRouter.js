const { Router } = require("express");
const { check } = require("express-validator");
const addResourceToTopic = require("../../../controllers/topics/admin/addResourceToTopic");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const { validateFields } = require("../../../middlewares/validate-fields");

const router = Router();

/**
 * @swagger
 * /api/topics/admin/{userId}/{topicId}/add-resource:
 *   put:
 *     tags: [Topics - Admin]
 *     summary: Agregar un recurso a un tema (Admin)
 *     description: Agrega un recurso existente a un tema específico. Requiere autenticación de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador que realiza la acción
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema al que se agregará el recurso
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
 *                 description: ID del recurso a agregar al tema
 *               isMandatory:
 *                 type: boolean
 *                 default: false
 *                 description: Indica si el recurso es obligatorio para el tema
 *     responses:
 *       200:
 *         description: Recurso agregado al tema exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Recurso agregado al tema exitosamente"
 *                 topic:
 *                   $ref: '#/components/schemas/Topic'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El recurso ya existe en este tema"
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       403:
 *         description: Prohibido - El usuario no tiene permisos de administrador
 *       404:
 *         description: Tema no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put(
    "/:userId/:topicId/add-resource",
    [
        check('userId', 'El ID de usuario es obligatorio').not().isEmpty(),
        check('topicId', 'El ID del tema es obligatorio').not().isEmpty(),
        check('resourceId', 'El ID del recurso es obligatorio').not().isEmpty(),
        validateFields,
        validateUserAndRole
    ],
    addResourceToTopic
);

module.exports = router;