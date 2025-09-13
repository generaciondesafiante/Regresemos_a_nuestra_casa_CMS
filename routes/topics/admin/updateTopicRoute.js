const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../../../middlewares/validate-fields");
const queryParser = require("../../../middlewares/queryParser");
const updateTopic = require("../../../controllers/topics/admin/updateTopic");

const router = Router();

router.patch(
  "/:topicId",
  [check("topicId", "El ID del curso es obligatorio").not().isEmpty()],
  updateTopic
);

module.exports = router;
