const { Router } = require("express");
const postCreateCourse = require("./courses/postCourse");
const postAddResourceToTopic = require("./courses/postAddResourceToTopic");
// const getCourses = require("./courses/getCourses");
const deleteCourses = require("./courses/deleteCourse");
const deleteTopicFromCourse = require("./courses/deleteTopicFromCourse");
const deleteResourceFromTopic = require("./courses/deleteResourceFromTopic");
const patchUpdateInfoCourse = require("./courses/patchUpdateInfoCourse");
const patchUpdateInfoTopicCourse = require("./courses/patchUpdateInfoTopicCourse");
const putUpdateReorderTopicsFromCourse = require("./courses/putReorderTopicsFromCourse");
const putUpdateReorderResourceFromTopic = require("./courses/putReorderResourcesFromTopic");
const addResourceToTopic = require('./courses/putUpdateLessonToTopic');
const getCourses = require('./courses/getCoursesPagina');
const router = Router();

router.use(postCreateCourse);
router.use(postAddResourceToTopic);
// // router.use(getCourses);
router.use(deleteCourses);
router.use(deleteTopicFromCourse);
router.use(deleteResourceFromTopic);
router.use(patchUpdateInfoCourse);
router.use(patchUpdateInfoTopicCourse);
router.use(putUpdateReorderTopicsFromCourse);
router.use(putUpdateReorderResourceFromTopic);
router.use(addResourceToTopic)


router.use(getCourses);
module.exports = router;
