var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var User = require('../models/users');



exports.init= function() {

   /* Character.remove({}, function(err) {
       console.log('collection removed')
    });*/
    var restaurant1 = new Restaurant({
        rest_name: "KFC",
        cusine_type: "English",
        telephone:"0101530101020",
        ranking: 1,
        feedback: "abc",
        postcode:"S3 7LJ",
        lat:"53.381600899999995",
        lng:"-1.4815976"
    });

    var user1 = new User({
        user_name: "zyad",
        password: "English"

    });
    var user2 = new User({
        user_name: "jerry",
        password: "English"

    });

    var restaurant2 = new Restaurant({
        rest_name: "Domino",
        cusine_type: "English",
        telephone:"01010101020",
        ranking: 2,
        feedback: "doo",
        postcode:"S3 8NU",
        lat:"53.387146",
        lng:"-1.466354"
    });
    var restaurant3 = new Restaurant({
        rest_name: "cosmo",
        cusine_type: "French",
        telephone:"01010101020",
        ranking: 1,
        feedback: "doo",
        postcode:"S3 7LJ",
        lat:"45.831803",
        lng:"3.079670"
    });
    var restaurant4 = new Restaurant({
        rest_name: "abc",
        cusine_type: "cosmo",
        telephone:"01010101020",
        ranking: 1,
        feedback: "doo",
        postcode:"S3 7LJ",
        lat:"45.831803",
        lng:"3.079670"
    })
    restaurant1.save(function (err, results) {
        console.log(results._id);
    });
    restaurant2.save(function (err, results) {
        console.log(results._id);
    });
    restaurant3.save(function (err, results) {
        console.log(results._id);
    });
    restaurant4.save(function (err, results) {
        console.log(results._id);
    });
    user1.save(function (err, results) {
        console.log(results._id);
    });
    user2.save(function (err, results) {
        console.log(results._id);
    });
}

