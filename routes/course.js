const { Router } = require("express");
const postCreateCourse = require("./courses/postCourse");
const postTopicCourse = require("./courses/postTopicCourse");
const postAddResourceToTopic = require("./courses/postAddResourceToTopic");
const getCourses = require("./courses/getCourses");
const deleteCourses = require("./courses/deleteCourse");
const deleteTopicFromCourse = require("./courses/deleteTopicFromCourse");
const deleteResourceFromTopic = require("./courses/deleteResourceFromTopic");
const patchUpdateInfoCourse = require("./courses/patchUpdateInfoCourse");
const patchUpdateInfoTopicCourse = require("./courses/patchUpdateInfoTopicCourse");
const putUpdateReorderTopicsFromCourse = require("./courses/putReorderTopicsFromCourse");
const putUpdateReorderResourceFromTopic = require("./courses/putReorderResourcesFromTopic");

const router = Router();

router.use(postCreateCourse);
router.use(postTopicCourse);
router.use(postAddResourceToTopic);
router.use(getCourses);
router.use(deleteCourses);
router.use(deleteTopicFromCourse);
router.use(deleteResourceFromTopic);
router.use(patchUpdateInfoCourse);
router.use(patchUpdateInfoTopicCourse);
router.use(putUpdateReorderTopicsFromCourse);
router.use(putUpdateReorderResourceFromTopic);

module.exports = router;
