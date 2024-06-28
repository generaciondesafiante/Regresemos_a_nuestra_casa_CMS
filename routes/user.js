const { Router } = require("express");
const CourseProgressUser = require("./user/progressUser");

const router = Router();

router.use(CourseProgressUser);

module.exports = router;
