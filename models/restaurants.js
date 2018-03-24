var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        rest_name: {type: String, max: 100},
        cusine_type: {type: String,max: 100},
        ranking: {type: Number},
        feedback: {type: String},
        postcode:{type:String},
        lat:{type:Number},
        long:{type:Number},
        image:{type:String}
    }
);

Restaurant.set('toObject', {getters: true, virtuals: true});


var restaurantModel = mongoose.model('Restaurant', Restaurant );

module.exports = restaurantModel;