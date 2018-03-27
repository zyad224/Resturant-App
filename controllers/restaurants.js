var Restaurant = require('../models/restaurants');




/*
This method is responsible to fetch the rquested
data from the system database then return the data
in a json format to the html page (front end).
 */
exports.getRest = function (req, res) {
    var userData = req.body;
    var totalRestaurants;

    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        res.setHeader('Content-Type', 'application/json');

        // queries executed on the database in parallel.
        var queryRestaurantName = { rest_name: userData.rest };
        var queryCusineType = { cusine_type: userData.rest };
        var queryRestaurantRanking = { ranking: userData.rest };
        var queryRestaurantFeedback = { feedback: userData.rest };
        var queryRestaurantPostcode = { postcode: userData.rest };


       Restaurant.find(queryCusineType).exec()
           .then(function(result1){
               return Restaurant.find(queryRestaurantName).exec()
                   .then(function(result2){
                       return Restaurant.find(queryRestaurantRanking).exec()
                           .then(function(result3){
                               return Restaurant.find(queryRestaurantFeedback).exec()
                                   .then(function(result4){
                                       return Restaurant.find(queryRestaurantPostcode).exec()
                                           .then(function(result5){
                                               return [result1,result2,result3,result4,result5];

                                           });

                                   })

                           })

                   })
           }).then(function(finalResult){
            res.send(JSON.stringify(finalResult));
       });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
}

exports.addRest=function(req,res){
    var userData = req.body;
    console.log('received: ' + userData);

    if (userData == null) {
        res.status(403).send('No data sent!')
    }

    try {

        var newRestaurant = new Restaurant ({
            rest_name: userData.rest,
            cusine_type: userData.cusine,
            ranking: userData.rank,
            feedback: userData.feed,
            postcode: userData.postc,
            image: userData.blah

        });

        console.log('received: ' + newRestaurant);

        newRestaurant.save(function (err, results) {
            console.log(results._id);
            if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(newRestaurant));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}