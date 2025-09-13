const { Router } = require("express");
const getTopicById = require("../../../controllers/topics/admin/getTopicById");

const router = Router();

router.get("/topicById/:userId/:topicId", getTopicById);

module.exports = router;
