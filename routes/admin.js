const { Router } = require("express");
const AllAdmins = require("../routes/admin/admins")
const GetStatusAdminDashboard = require("../routes/admin/getStatusAdminDashboard")
const SearchUsers = require("../routes/admin/searchUsers")
const UpdateRoleAdmin = require("../routes/admin/updateRolAdmin")
const router = Router();

router.use(AllAdmins)
router.use(GetStatusAdminDashboard)
router.use(SearchUsers)
router.use(UpdateRoleAdmin)


module.exports = router;
