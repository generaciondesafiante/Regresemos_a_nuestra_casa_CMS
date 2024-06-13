const { Router } = require("express");
const postCreateCourse = require("./courses/postCourse");
const postTopicCourse = require("./courses/postTopicCourse");
const postAddResourceToTopic = require("./courses/postAddResourceToTopic");
const getCourses = require("./courses/getCourses");

const router = Router();

router.use(postCreateCourse);
router.use(postTopicCourse);
router.use(postAddResourceToTopic);
router.use(getCourses);

module.exports = router;
