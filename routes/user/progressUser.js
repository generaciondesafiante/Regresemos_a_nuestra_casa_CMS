const { Router } = require("express");
const {
  CourseProgress,
} = require("../../controllers/user/coursesProgressUser");

const router = Router();

router.post("/courseProgress", CourseProgress);

module.exports = router;
