const express = require("express");
const router = express.Router();
const platformController = require("./../controllers/platform.server.controller");

router.post('/savePlatform',platformController.savePlatform);
router.post('/upload',platformController.uploadPlatform);
module.exports = router;