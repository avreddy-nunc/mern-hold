import Platform from './../models/platfrom.server.model';
import multer from "multer";

exports.savePlatform = function (req,res,next) {
    console.log('triggered');
    var platformData = new Platform(req.body);
    console.log(req.body);
    platformData.save()
        .then((platfor)=>{
            res.json(platfor)
        })
        .catch((err)=>{
            res.send(err)
        });
};
exports.uploadPlatform = function (req, res, next) {
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });
    var upload = multer({ dest : "uploads/"}).single('data');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded successfully!");
    });
};