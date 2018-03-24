var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');


exports.init= function() {
    // uncomment if you need to drop the database
    //
    // Character.remove({}, function(err) {
    //    console.log('collection removed')
    // });
    var restaurant = new Restaurant({
        rest_name: "abc",
        cusine_type: "abc",
        ranking: 1,
        feedback: "abc",
        postcode:"abc",
        lat:1,
        long:1,
        image:1
    });


    restaurant.save(function (err, results) {
        console.log(results._id);
    });
}

