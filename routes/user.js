const { Router } = require("express");
const CourseProgressUser = require("./user/progressUser");
const LastViewedResource = require("./user/lastViewedResource");
const AddAdmin = require("./user/addAdmin");

const router = Router();

router.use(CourseProgressUser);
router.use(LastViewedResource);
router.use(AddAdmin);

module.exports = router;
