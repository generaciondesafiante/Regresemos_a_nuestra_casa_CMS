const { Router } = require("express");
const { updateVideoStatus, lastViewedVideo } = require("../controllers/course");
const router = Router();

router.put(
  "/updateVideoStatus/:id/:courseId/:topicId/:lessonId/:videoId",
  updateVideoStatus
);

router.put("/lastViewedVideo/:id", lastViewedVideo);

module.exports = router;
