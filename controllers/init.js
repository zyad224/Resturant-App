var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var User = require('../models/users');



exports.init= function() {

   /* Character.remove({}, function(err) {
       console.log('collection removed')
    });*/
    // var restaurant1 = new Restaurant({
    //     rest_name: "KFC",
    //     cusine_type: "English",
    //     telephone:"0101530101020",
    //     ranking: 1,
    //     feedback: "abc",
    //     postcode:"S3 7LJ",
    //     address:"163 West St, Sheffield",
    //     lat:"53.381600899999995",
    //     lng:"-1.4815976",
    //     image:"1"
    // });
    // var restaurant2 = new Restaurant({
    //     rest_name: "Domino",
    //     cusine_type: "French",
    //     telephone:"01010101020",
    //     ranking: 2,
    //     feedback: "Visited with partner before theatre. When the food arrived my Loster wasn't even warm, half the Lobster meat seemed to be missing and it tasted disgusting like it had been cooked on cleaning products. I complained the Lobster was cold and they took it away with my chips to heat the Lobster and brought it back with cold chips. ",
    //     postcode:"S3 8NU",
    //     address:"371-373 Ecclesall Rd, Sheffield",
    //     lat:"53.387146",
    //     lng:"-1.466354",
    //     image:"1"
    // });
    // var user1 = new User({
    //     user_name: "jerry",
    //     password: "English"
    //
    // });

    // restaurant1.save(function (err, results) {
    //     console.log(results._id);
    // });
    // restaurant2.save(function (err, results) {
    //     console.log(results._id);
    // });
    // user1.save(function (err, results) {
    //     console.log(results._id);
    // });
}

