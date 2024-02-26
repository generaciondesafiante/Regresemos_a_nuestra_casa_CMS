const { Router } = require("express");
const {
  coursesProgressUser,
  lastViewedVideos,
} = require("../controllers/course");
const router = Router();

router.put("/courseProgress", coursesProgressUser);

router.put("/lastViewedVideos", lastViewedVideos);

module.exports = router;
