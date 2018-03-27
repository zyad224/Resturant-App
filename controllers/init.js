var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');


exports.init= function() {
    // uncomment if you need to drop the database
    //
    // Character.remove({}, function(err) {
    //    console.log('collection removed')
    // });
    // var restaurant1 = new Restaurant({
    //     rest_name: "abc",
    //     cusine_type: "c",
    //     ranking: 1,
    //     feedback: "abc",
    //     postcode:"abc",
    //     lat:1,
    //     long:1,
    //     image:1
    // });
    //
    // var restaurant2 = new Restaurant({
    //     rest_name: "b",
    //     cusine_type: "abc",
    //     ranking: 2,
    //     feedback: "doo",
    //     postcode:"abc",
    //     lat:1,
    //     long:1,
    //     image:1
    // });
    // var restaurant3 = new Restaurant({
    //     rest_name: "d",
    //     cusine_type: "f",
    //     ranking: 1,
    //     feedback: "doo",
    //     postcode:"123",
    //     lat:1,
    //     long:1,
    //     image:1
    // });
    // restaurant1.save(function (err, results) {
    //     console.log(results._id);
    // });
    // restaurant2.save(function (err, results) {
    //     console.log(results._id);
    // });
    // restaurant3.save(function (err, results) {
    //     console.log(results._id);
    // });
}

