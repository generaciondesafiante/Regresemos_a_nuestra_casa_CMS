const { Router } = require("express");
const putUpdateResources = require("./resources/admin/putUpdateResources");
const postCreateResource = require("./resources/admin/postCreateResource");
const getAllResources = require("./resources/admin/getAllResources");
const deleteResource = require("./resources/admin/deleteResource");

const router = Router();

router.use(putUpdateResources);
router.use(postCreateResource);
router.use(getAllResources);
router.use(deleteResource);

module.exports = router;
