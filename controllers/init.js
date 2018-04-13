var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');


exports.init= function() {

   /* Character.remove({}, function(err) {
       console.log('collection removed')
    });*/
    var restaurant1 = new Restaurant({
        rest_name: "KFC",
        cusine_type: "English",
        ranking: 1,
        feedback: "abc",
        postcode:"S3 7LJ",
        lat:"53.381600899999995",
        lng:"-1.4815976"
    });

    var restaurant2 = new Restaurant({
        rest_name: "Domino",
        cusine_type: "English",
        ranking: 2,
        feedback: "doo",
        postcode:"S3 8NU",
        lat:"53.387146",
        lng:"-1.466354"
    });
    var restaurant3 = new Restaurant({
        rest_name: "cosmo",
        cusine_type: "English",
        ranking: 1,
        feedback: "doo",
        postcode:"S3 7LJ",
        lat:"45.831803",
        lng:"3.079670"
    });
    restaurant1.save(function (err, results) {
        console.log(results._id);
    });
    restaurant2.save(function (err, results) {
        console.log(results._id);
    });
    restaurant3.save(function (err, results) {
        console.log(results._id);
    });
}

