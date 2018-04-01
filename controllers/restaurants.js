var Restaurant = require('../models/restaurants');

var express =   require("express");
var multer  =   require('multer');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/*
This method is responsible to fetch the rquested
data from the system database then return the data
in a json format to the html page (front end).
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

exports.uploadImage=function (req, res) {
    req.file('avatar').upload({dirname:'../../public/avatar'},function (err, uploadedFiles) {

        if (err) return res.send(500, err);
        return res.json({
            message: uploadedFiles.length + ' file(s) uploaded successfully!',
            files: uploadedFiles
        });
    });

};

exports.insert = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var character = new Restaurant({
            rest_name: userData.rest,
            cusine_type: userData.cusine,
            ranking: userData.rank,
            feedback: userData.feed,
            postcode: userData.postc,
            image: userData.file
        });
        console.log('received: ' + character.image);

        character.save(function (err, results) {
            console.log(results._id);
            if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(character));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}