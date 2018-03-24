var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        rest_name: {type: String, required: true, max: 100},
        cusine_type: {type: String, required: true, max: 100},
        ranking: {type: Number},
        feedback: {type: String},
        postcode:{type:String},
        lat:{type:Number},
        long:{type:Number},
        image:{type:data}


    }
);

