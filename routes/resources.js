const { Router } = require("express");
const { createResource } = require("../controllers/resources/createResource");
const {
  validateResourceType,
  validateVisibilityType,
} = require("../middlewares/validate-resources");
const { validateUserAndRole } = require("../middlewares/validate-rolUser");

const router = Router();

router.post(
  "/createResource/:id",
  validateUserAndRole,
  validateResourceType,
  validateVisibilityType,
  createResource
);

module.exports = router;
