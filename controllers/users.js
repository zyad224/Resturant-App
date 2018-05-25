/*
This is the User controller. it includes methods to
add a new user to the database and check user credentials when they login .

addUser: is used by socket.io to register new users in the system.
checkCredentials: is used by AJAX to check user credentials when they login.
 */

var User = require('../models/users');

var express =   require("express");
var multer  =   require('multer');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var NodeGeocoder=require('node-geocoder');
var session = require('express-session');

/*
This method is responsible add a new user to the system. it recieves
the username and password of the new user then checks if these credentials already
exists or not. it returns v=false if the crednetials exists and true otherwise. This
method is called by a scoket.io. Communication is via socket.io
 */
exports.addUser=function(username,psw,v){


    var query = { user_name: username, password: psw};

    User.find(query).exec()
        .then(function (result) {
            var alert;
            console.log(result);

            if (result.length > 0) {
                v(false);

            }
            else {
                var user = new User({
                    user_name: username,
                    password: psw
                });

                user.save(function (err, results) {

                });
                v(true);


            }
        })



};

/*
This method is responsible to check the credentials of the user when they
login. it return the results if its found. null otherwise. Communication is via AJAX.
 */
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
                    req.session.username=userData.usr;
                    console.log(req.session);
                    console.log('session has been created');
                    res.send(JSON.stringify(result));
                   // res.render("insert",{dataArray:result});
                }
                else {
                    res.send(JSON.stringify(""));

                }
            })






};