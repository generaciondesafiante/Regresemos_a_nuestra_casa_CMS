const { Router } = require("express");
const { updateVideoStatus } = require("../controllers/course");
const router = Router();

router.put(
  "/updateVideoStatus/:id/:courseId/:topicId/:lessonId/:videoId",
  updateVideoStatus
);

module.exports = router;
