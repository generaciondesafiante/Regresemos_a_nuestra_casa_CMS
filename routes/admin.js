const { Router } = require("express");
const router = Router();
const getAdminStats = require("../controllers/dashboardAdmin/adminDashboard");
const { validateUserAndRole } = require("../middlewares/validate-rolUser");
const getAllAdmins = require("../controllers/dashboardAdmin/allAdmins");
const { validateJWT } = require("../middlewares/validate-jwt");
const findStudent = require("../controllers/dashboardAdmin/findStudent");
const { validateFields } = require("../middlewares/validate-fields");
const changeUserRole = require("../controllers/dashboardAdmin/changeUserRole");
const { check } = require("express-validator");

router.get("/stats/:userId", [validateUserAndRole], getAdminStats);
router.get("/admins/:userId", [validateUserAndRole], getAllAdmins);
router.get("/find/:userId/:searchTerm", validateUserAndRole, findStudent);
router.put(
  "/change-role/:userId/:id",
  [
    validateUserAndRole,
    check("id", "No es un ID válido").isMongoId(),
    check("isAdmin", "El campo isAdmin es requerido").isBoolean(),
    validateFields,
  ],
  changeUserRole
);

module.exports = router;
