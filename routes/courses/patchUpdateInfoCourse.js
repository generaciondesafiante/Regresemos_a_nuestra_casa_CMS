const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const updateInfoCurse = require("../../controllers/courses/updateInfoCourse");
const { validateCourseType } = require("../../middlewares/validate-courseType");

const router = Router();

/**
 * @swagger
 *  /api/course/{userId}/updateInfoCourse/{courseId}:
 *    patch:
 *      summary: Update course information
 *      tags: [Courses]
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: courseId
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nameCourse:
 *                  type: string
 *                  example: Nuevo Nombre del Curso
 *                titleCourse:
 *                  type: string
 *                  example: Nuevo Título del Curso
 *                typeOfRoute:
 *                  type: string
 *                  example: Nuevo Tipo de Ruta
 *      responses:
 *        "200":
 *          description: Curso actualizado exitosamente
 *        "404":
 *          description: Curso no encontrado
 *        "500":
 *          description: Error actualizando el curso
 */

router.patch(
  "/:userId/updateInfoCourse/:courseId",
  validateUserAndRole,
  validateCourseType,
  updateInfoCurse
);
module.exports = router;
