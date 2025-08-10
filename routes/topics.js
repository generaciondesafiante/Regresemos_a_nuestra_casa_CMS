const { Router } = require("express");
const addTopicToCourse = require("./topics/addResourseTopicRouter");
const createTopicToCourse = require("./topics/createTopicToCourse");
const getTopicToCourse = require("./topics/getTopicToCourse");
const getTopicById = require("./topics/getTopicByIdRouter");

const router = Router();

router.use(addTopicToCourse);
router.use(createTopicToCourse);
router.use(getTopicToCourse);
router.use(getTopicById)

module.exports = router;
