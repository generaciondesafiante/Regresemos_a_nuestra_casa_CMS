const { Router } = require("express");
const { check } = require("express-validator");
const getCourseById = require("../../../controllers/courses/admin/getCourseById");
const { validateFields } = require("../../../middlewares/validate-fields");
const { validateJWT } = require("../../../middlewares/validate-jwt");

const router = Router();

/**
 * @swagger
 * /api/courses/admin/{id}:
 *   get:
 *     tags: [Courses - Admin]
 *     summary: Obtener un curso por ID (Admin)
 *     description: Obtiene la información detallada de un curso específico incluyendo sus temas y recursos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso a consultar
 *     responses:
 *       200:
 *         description: Curso encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado - Se requiere autenticación de administrador
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Curso no encontrado"
 *       500:
 *         description: Error del servidor
 */
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    validateFields
  ],
  getCourseById
);

module.exports = router;
