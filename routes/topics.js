const { Router } = require("express");
const addTopicToCourse = require("./topics/admin/addResourseTopicRouter");
const createTopicToCourse = require("./topics/admin/createTopicToCourse");
const getTopicToCourse = require("./topics/admin/getTopicToCourse");
const deleteTopic = require("./topics/admin/deleteTopicRouter");
const getTopicByIdTable = require("./topics/admin/getTopicByIdTableRouter");
const getTopicById = require("./topics/admin/getTopicByIdRoute");
const updateTopic = require("./topics/admin/updateTopicRoute");
const router = Router();

router.use(addTopicToCourse);
router.use(createTopicToCourse);
router.use(getTopicToCourse);
router.use(getTopicByIdTable);
router.use(deleteTopic);
router.use(getTopicById);
router.use(updateTopic);


module.exports = router;
