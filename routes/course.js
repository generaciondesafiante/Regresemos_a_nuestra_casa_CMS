const { Router } = require("express");
const { updateVideoStatus, lastViewedVideos } = require("../controllers/course");
const router = Router();

router.put(
  "/updateVideoStatus/:id/:courseId/:topicId/:lessonId/:videoId",
  updateVideoStatus
);

router.put("/lastViewedVideos/:id", lastViewedVideos);

module.exports = router;
