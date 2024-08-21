const { Router } = require("express");
const { changeAdminRole } = require("../../controllers/auth/changeAdminRole");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const router = Router();
/**
 * @swagger
 *  /api/user/addAdmin:
 *   patch:
 *     summary: Modificar el rol de administrador de un usuario
 *     description: Permite a un usuario administrador cambiar el rol de otro usuario a administrador.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin:
 *                 type: boolean
 *                 description: Estado de administrador del usuario.
 *             example:
 *               admin: true
 *     responses:
 *       200:
 *         description: Rol de administrador actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "patch API - Rol de administrador actualizado"
 *                 id:
 *                   type: string
 *                   example: "60b6c8f9f10a9c5a4c8e2e5d"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     admin:
 *                       type: boolean
 *                       example: true
 *       403:
 *         description: No tienes permiso para cambiar la propiedad admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No tienes permiso para cambiar la propiedad admin."
 *       400:
 *         description: No se ha proporcionado la propiedad admin para actualizar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se ha proporcionado la propiedad admin para actualizar."
 */
router.patch("/addAdmin/:userId", [validateUserAndRole], changeAdminRole);

module.exports = router;
