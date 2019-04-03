const express = require("express");
const router = express.Router();
const platformController = require("./../controllers/platform.server.controller");
import multer from "multer";
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage : storage}).single('data');
router.post('/savePlatform',platformController.savePlatform);
router.post('/upload',upload,platformController.uploadPlatform);
module.exports = router;