const { Router } = require("express");
const putUpdateResources = require("./resources/putUpdateResources");
const postCreateResource = require("./resources/postCreateResource");
const getAllResources = require("./resources/getAllResources");
const deleteResource = require("./resources/getAllResources");

const router = Router();

router.use(putUpdateResources);
router.use(postCreateResource);
router.use(getAllResources);
router.use(deleteResource);

module.exports = router;
