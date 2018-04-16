var User = require('../models/users');

var express =   require("express");
var multer  =   require('multer');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var NodeGeocoder=require('node-geocoder');

exports.addUser=function(username,psw,v){


    var query = { user_name: username, password: psw};

    User.find(query).exec()
        .then(function (result) {
            var alert;
            console.log(result);

            if (result.length > 0) {
                v(false);

              //  alert("user exist");
              //  console.log(result);
                //alert("user already exists");
            }
            else {
                var user = new User({
                    user_name: username,
                    password: psw
                });

                user.save(function (err, results) {
                    //console.log(results);
                });
                v(true);

               // alert("user added to the system");

            }
        })



};
exports.checkCredential=function(req,res){
    var userData = req.body;
// console.log(userData);

    if (userData == null) {
        res.status(403).send('No data sent!')
    }

    res.setHeader('Content-Type', 'application/json');
     //console.log(userData);
    // console.log(psw);
    var query = { user_name: userData.usr, password: userData.psw};


        User.find(query).exec()
            .then(function (result) {
                //console.log(result);

                if (result.length != 0) {
                   // console.log(result);
                    res.send(JSON.stringify(result));
                   // res.render("insert",{dataArray:result});
                }
                else {
                    res.send(JSON.stringify(""));

                }
            })






};