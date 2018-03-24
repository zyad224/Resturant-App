var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        rest_name: {type: String, required: true, max: 100},
        cusine_type: {type: String, required: true, max: 100}
    });

Restaurant.set('toObject', {getters: true, virtuals: true});


var restaurantModel = mongoose.model('Restaurant', Restaurant );

module.exports = restaurantModel;