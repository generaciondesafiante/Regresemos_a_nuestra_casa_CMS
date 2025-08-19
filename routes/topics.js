const { Router } = require("express");
const addTopicToCourse = require("./topics/admin/addResourseTopicRouter");
const createTopicToCourse = require("./topics/admin/createTopicToCourse");
const getTopicToCourse = require("./topics/admin/getTopicToCourse");
const getTopicById = require("./topics/admin/getTopicByIdRouter");
const deleteTopic = require("./topics/admin/deleteTopicRouter");

const router = Router();

router.use(addTopicToCourse);
router.use(createTopicToCourse);
router.use(getTopicToCourse);
router.use(getTopicById);
router.use(deleteTopic)

module.exports = router;
