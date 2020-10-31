// mongoose use

const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({

    mainTitle : {type: String, required : true},
    extraTitle : {type: String, required : true},
    date : {type: String, required : true},
    contents : {type: String, required : true}


});

//module exports
module.exports = mongoose.model('Board', boardSchema);