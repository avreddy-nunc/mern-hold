import Platform from './../models/platfrom.server.model';
import FindStoredWater from "./main-logic";

exports.savePlatform = function (req,res,next) {
    console.log('triggered');
    var arr = req.body.platformArr;
    var storedWater,usedCubes;
    ({ storedWater, usedCubes} = FindStoredWater(arr));
    res.json({"storedWater":storedWater,"usedCubes":usedCubes})
    /*var platformData = new Platform(req.body);
    console.log(req.body);
    platformData.save()
        .then((platfor)=>{
            res.json(platfor)
        })
        .catch((err)=>{
            res.send(err)
        });*/
};
exports.uploadPlatform = function (req, res, next) {
};