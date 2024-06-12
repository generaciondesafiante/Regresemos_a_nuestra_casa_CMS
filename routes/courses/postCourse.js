const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const createCourse = require("../../controllers/courses/createCourse");
const { validateCourseType } = require("../../middlewares/validate-courseType");

const router = Router();
router.post("/:id", validateUserAndRole, validateCourseType, createCourse);
module.exports = router;
