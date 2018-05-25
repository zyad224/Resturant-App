/*
This is the model of the restaurant.
Every restaurant has name, cusine type,telephone,
feedback,postcode, address,latitude, longitude, and image.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        rest_name: {type: String, max: 100},
        cusine_type: {type: String,max: 100},
        telephone:{type:String},
        ranking: {type: String},
        feedback: {type: String},
        postcode:{type:String},
        address:{type:String},
        lat:{type:Number},
        lng:{type:Number},
        image:{ type:String }
    }
);

Restaurant.set('toObject', {getters: true, virtuals: true});


var restaurantModel = mongoose.model('Restaurant', Restaurant );

module.exports = restaurantModel;