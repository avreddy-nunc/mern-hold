import Platform from './../models/platfrom.server.model';
import FindStoredWater from "./main-logic";

exports.savePlatform = function (req,res,next) {
    var arr = req.body.platformArr;
    if(!arr.length){
        res.send(400).send('Invalid data to perform operation');
        return false;
    }
    var platformData = FindStoredWater(arr);
    var platform = new Platform;
    platform.water = platformData.storedWater;
    platform.height = platformData.maxHeight;
    platform.array = arr;
    platform.storedCubes = platformData.usedCubes;
    platform.fileName = req.body.fileName;
    console.log(platform);
    platform.save()
        .then(response=>{
            res.json(response);
        })
        .catch(err=>{
            res.json(err);
        })
};
exports.getPlatforms = function (req, res, next){
    var page = parseInt(req.query.page) - 1;
    var limit = parseInt(req.query.limit);
    Platform.find({},{},{limit:limit,skip : page*limit},function (err, response) {
        if(err){
            console.log(err);
            res.sendStatus(400);
        }else{
            console.log("response",response);
            res.json(response);
        }
    })
};
exports.uploadPlatform = function (req, res, next) {
    var arr = req.body.platformArr;
    if(!arr.length){
        res.send(400).send('Invalid data to perform operation');
        return false;
    }
    var platformData = FindStoredWater(arr);
    var platform = new Platform;
    platform.water = platformData.storedWater;
    platform.height = platformData.maxHeight;
    platform.array = arr;
    platform.storedCubes = platformData.storedCubes;
    console.log(platform);
    /*platform.save()
        .then(res=>{
            res.send(res);
        })
        .catch(err=>{
            res.send(err);
        })
*/
};