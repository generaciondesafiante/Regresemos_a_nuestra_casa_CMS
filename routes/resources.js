const { Router } = require("express");
const { createResource } = require("../controllers/resources/createResource");
const {
  validateResourceType,
  validateVisibilityType,
} = require("../middlewares/validate-resources");
const { validateUserAndRole } = require("../middlewares/validate-rolUser");
const allResources = require("../controllers/resources/allResources");

const router = Router();

router.post(
  "/createResource/:id",
  validateUserAndRole,
  validateResourceType,
  validateVisibilityType,
  createResource
);

router.get("/resources/:id", validateUserAndRole, allResources);

module.exports = router;
