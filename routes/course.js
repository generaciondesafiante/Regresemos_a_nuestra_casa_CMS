const { Router } = require("express");
const postCreateCourse = require("./courses/admin/postCourse");
const getCourses = require('./courses/admin/getCoursesPagina');
const updateCourse = require('./courses/admin/updateCourse');
const deleteCourse = require('./courses/admin/deleteCourse');
const getCourseById = require('./courses/admin/getCourseById');

const router = Router();




router.use(postCreateCourse);
router.use(getCourses);
router.use(updateCourse);
router.use(deleteCourse);
router.use(getCourseById);
module.exports = router;
