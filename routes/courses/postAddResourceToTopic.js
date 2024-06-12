const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const addResourceToTopic = require("../../controllers/courses/addResourcesToTopic");

const router = Router();
router.post("/topics/resources/:id", validateUserAndRole, addResourceToTopic);
module.exports = router;
