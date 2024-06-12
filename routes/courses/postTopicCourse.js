const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const createTopicToCourse = require("../../controllers/courses/createTopicCourse");

const router = Router();
router.post("/topics/:id", validateUserAndRole, createTopicToCourse);
module.exports = router;
