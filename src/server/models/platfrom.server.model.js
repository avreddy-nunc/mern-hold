const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
    water: {
        type: Number,
        default: 0
    },
    height : {
        type : Number,
        default : 0
    },
    array : {
        type : Array,
        default : []
    },
    storedCubes : {
        type : Array,
        default : []
    },
    fileName : {
        type : String
    }
});

module.exports = mongoose.model('Platform', PlatformSchema);
