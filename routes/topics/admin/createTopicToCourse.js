const { Router } = require("express");
const { check } = require("express-validator");
const { validateUserAndRole } = require("../../../middlewares/validate-rolUser");
const { validateFields } = require("../../../middlewares/validate-fields");
const createAndAssociateTopic = require("../../../controllers/topics/admin/createTopicCourse");

const router = Router();

/**
 * @swagger
 * /api/topics/admin/{userId}/createTopic:
 *   post:
 *     tags: [Topics - Admin]
 *     summary: Crear un nuevo tema y asociarlo a un curso (Admin)
 *     description: Crea un nuevo tema y lo asocia a un curso existente en una transacción atómica. Requiere autenticación de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador que realiza la acción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameTopic
 *               - courseId
 *             properties:
 *               nameTopic:
 *                 type: string
 *                 description: Nombre del tema a crear
 *                 example: "Introducción a Node.js"
 *               courseId:
 *                 type: string
 *                 description: ID del curso al que se asociará el tema
 *     responses:
 *       201:
 *         description: Tema creado y asociado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 topic:
 *                   $ref: '#/components/schemas/Topic'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Se requieren nameTopic y courseId"
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Curso no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error al crear el tema"
 *                 details:
 *                     type: string
 *                     description: Detalles del error (solo en desarrollo)
 */
router.post(
  "/:userId/createTopic",
  [
    check('userId', 'El ID de usuario es obligatorio').not().isEmpty(),
    check('nameTopic', 'El nombre del tema es obligatorio').not().isEmpty(),
    check('courseId', 'El ID del curso es obligatorio').not().isEmpty(),
    validateFields,
    validateUserAndRole
  ],
  createAndAssociateTopic
);

module.exports = router;
