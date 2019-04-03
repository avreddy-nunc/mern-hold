const express = require("express");
const router = express.Router();
const platformController = require("./../controllers/platform.server.controller");
var path = require('path');

router.post('/savePlatform',platformController.savePlatform);
router.post('/upload',platformController.uploadPlatform);
router.get('/getPlatforms',platformController.getPlatforms);
module.exports = router;