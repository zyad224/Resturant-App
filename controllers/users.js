var User = require('../models/users');

var express =   require("express");
var multer  =   require('multer');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var NodeGeocoder=require('node-geocoder');

exports.addUser=function(username,psw){
    var user = new User({
        user_name: username,
        password: psw
    });

    user.save(function (err, results) {
        console.log(results);
    });

};
exports.checkCredential=function(req,res){
    var userData = req.body;

     console.log(userData);
    // console.log(psw);
    var query = { user_name: username , password: psw};
    var f;
    // try {
    //     // User.find(query).exec()
    //     //     .then(function (result) {
    //     //         if(result.length!=0) {
    //     //             //f=true;
    //     //             re(true);
    //     //            // Boolean(f);
    //     //         }
    //     //         else{
    //     //             re(false);
    //     //            // f=false;
    //     //           //  Boolean(f);
    //     //            // console.log("no user");
    //     //         }
    //
    //
    //         })
    // }catch(e){
    //     alert("error in the server");
    // }

   // console.log(re);

};