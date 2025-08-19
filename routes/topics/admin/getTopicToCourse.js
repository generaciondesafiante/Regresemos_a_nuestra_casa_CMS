const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../../../middlewares/validate-fields");
const getTopicsByCourse = require("../../../controllers/topics/admin/getTopicsByCourse");
const queryParser = require("../../../middlewares/queryParser");

const router = Router();

/**
 * @swagger
 * /api/topics/admin/{courseId}:
 *   get:
 *     tags: [Topics - Admin]
 *     summary: Obtener temas por curso (Admin)
 *     description: Obtiene la lista de temas asociados a un curso específico con paginación, búsqueda y filtrado.
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso del cual se desean obtener los temas
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
 *         description: Cantidad de temas por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda para filtrar temas por nombre
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Campo por el cual ordenar los resultados (ej. 'createdAt', 'nameTopic')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Orden de clasificación (ascendente o descendente)
 *     responses:
 *       200:
 *         description: Lista de temas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Topic'
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
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Course not found"
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
  "/:courseId",
  [
    check('courseId', 'El ID del curso es obligatorio').not().isEmpty(),
    validateFields,
    queryParser
  ],
  getTopicsByCourse
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nameTopic:
 *           type: string
 *         resources:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Resource'
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
