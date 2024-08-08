const { Router } = require("express");
const CourseProgressUser = require("./user/progressUser");
const LastViewedResource = require("./user/lastViewedResource");

const router = Router();

router.use(CourseProgressUser);
router.use(LastViewedResource);

module.exports = router;
