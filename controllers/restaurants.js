/*
This is the Restaurant controller. it includes methods to
insert new restaurant, get all restaurants, upload photos to restaurants,
insert restaurants feedback, and search restaurants (map and search bar).
 */

var Restaurant = require('../models/restaurants');

var express =   require("express");
var multer  =   require('multer');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var NodeGeocoder=require('node-geocoder');

/*
This method is responsible to fetch the requested
restaurants data from the system database then return the data
in a json format to the html page (front end). This function recieves whatever
the user types in the search bar then search the database for these information. Promises are
used to enhance readability and efficiency. Communication is via AJAX and JSON
 */
exports.getRest = function (req, res) {
    var userData = req.body;

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

        var query1 = new Promise(
            function(resolve,reject){
                resolve(Restaurant.find(queryCusineType).exec());
            }

        );
        var query2 = new Promise(
            function(resolve,reject){
                resolve(Restaurant.find(queryRestaurantName).exec());
            }

        );
        var query3 = new Promise(
            function(resolve,reject){
                resolve(Restaurant.find(queryRestaurantRanking).exec());
            }

        );
        var query4 = new Promise(
            function(resolve,reject){
                resolve(Restaurant.find(queryRestaurantFeedback).exec());
            }

        );
        var query5 = new Promise(
            function(resolve,reject){
                resolve(Restaurant.find(queryRestaurantPostcode).exec());
            }

        );
        var execute= function(){
           var finalResult;
            query1
                .then(function(result1){
                    return query2
                        .then(function(result2){
                            return query3
                                .then(function(result3){
                                    return query4
                                        .then(function(result4){
                                            return query5
                                                .then(function(result5){
                                                    return [result1,result2,result3,result4,result5];
                                                });
                                        })
                                })
                        })
                }).then(function(finalResult){
                   console.log(finalResult);
                 res.send(JSON.stringify(finalResult));
            });


        };

        execute();


    } catch (e) {
        res.status(500).send('error ' + e);
    }
};


/*
This method is responsible to insert a new restaurant in the database.
It recieves the information from the user via AJAX then creates a new restaurant variable, populate it,
and saves it. Communication is via AJAX and JSON
 */
exports.insert = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var restaurant = new Restaurant({
            rest_name: userData.rest,
            cusine_type: userData.cusine,
            feedback: userData.feed,
            postcode: userData.postc,
            address:userData.address,
            lat:userData.lat,
            lng:userData.lng,
            image: userData.file
        });

        restaurant.save(function (err, results) {
            console.log(results._id);
            if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(restaurant));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

/*
This method is responsible to fetch restaurants depending on user input
(postcode, restaurant name, cusine type). This method is used in the map search when
a user tries to find a restaurant by postalcode,name,type). Communication is via AJAX and JSON
 */
exports.getLocation=function(req,res){
    var userData = req.body;
   // console.log(userData);
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {

        // queries executed on the database in parallel.
        var queryRestaurantPostcode = { postcode: userData.address };
        var queryRestaurantName = { rest_name:  userData.address };
        var queryCusineType = { cusine_type: userData.address };


        Restaurant.find(queryRestaurantPostcode).exec()
            .then(function(result1){
                return Restaurant.find(queryRestaurantName).exec()
                    .then(function(result2){
                        return Restaurant.find(queryCusineType).exec()
                            .then(function(result3){
                                return [result1,result2,result3];
                            })
                    })
            }).then(function(finalResult){
              //  console.log(finalResult);
            res.send(JSON.stringify(finalResult));
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }


};

/*
This method is responsible to return the data of a specific restaurant when
the user click on that restaurant. The data then will viewed in a html page to show
the information of that restaurant to the user. Communication is via AJAX and JSON
 */
exports.showSinglePage = function(req,res){
    var rest = req.body;
    if (rest == null) {
        res.status(403).send('No data sent!')
    }
    try{
        var queryRestaurantID = { _id: rest.ObjectId };
        Restaurant.findOne(queryRestaurantID).exec()
            .then(function(result){
                res.render('restaurant', {restResult:result})
            });
    } catch (e){
        res.status(500).send('error ' + e);
    }
};

/*
This method is responsible to upload an image for a the restaurant being registered.
The Image is saved under the directory "avatar" then after that the path of the image is
saved in the database in the restaurant entry. Communication is via AJAX and JSON
 */
exports.uploadImage=function (req, res) {
    req.file('avatar').upload({dirname:'../../public/avatar'},function (err, uploadedFiles) {
        if (err) return res.send(500, err);
        var index=uploadedFiles[0].fd.indexOf("avatar");
        var path="http://localhost:3003"+uploadedFiles[0].fd.slice(index-1);
        console.log(path);

        try{

            var myquery = { image:null};
            var newvalues = { $set: { image: path } };
            Restaurant.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
            });
            res.render('dashboard',{username : req.session.username});
        } catch (e) {
            res.status(500).send('error ' + e);
        }


    });
};

/*
This method is responsible to update the points of restaurant in the database.
It receives the feedback from the use in point. it updates the points in database by:
old points + new points. Communication is via AJAX and JSON
 */
exports.sendFeedback = function (req, res) {
    var userData = req.body;
    console.log(userData);
    if (userData == null) {
        res.status(403).send('No data sent!')
    }

try{
    var name= userData.na;
    var id= userData.rId;
    var feed= parseInt(userData.p);

    var queryRestaurant = { rest_name: name, _id: id };

    Restaurant.find(queryRestaurant).exec()
        .then(function (result){
           // console.log(result[0].feedback);
            var oldFeed=parseInt(result[0].feedback);
            var newFeed=(oldFeed+feed);
            console.log(newFeed);

            var myquery = { _id:id,rest_name:name};
            var newvalues = { $set: { feedback: newFeed } };
            Restaurant.updateOne(myquery, newvalues, function(err, res) {
               // if (err) throw err;
                console.log("1 document updated");
            });
        });
    res.render('/index');
    // res.send(JSON.stringify("updated"));
} catch (e) {
    res.status(500).send('error ' + e);
}
};