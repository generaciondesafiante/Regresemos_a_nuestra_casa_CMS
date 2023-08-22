
const { Router } = require("express");
const { coursesData } = require("../controllers/course");
const router = Router();

router.get("/coursedata",
    coursesData
);

module.exports = router;
