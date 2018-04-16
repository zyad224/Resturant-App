var User = require('../models/users');

var express =   require("express");
var multer  =   require('multer');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var NodeGeocoder=require('node-geocoder');


exports.checkCredential=function(username,psw){

    // console.log(username);
    // console.log(psw);
    var query = { user_name: username , password: psw};
    var f;
    try {
        User.find(query).exec()
            .then(function (result) {
                if(result.length!=0) {
                    f=true;
                    Boolean(f);
                }
                else{
                    f=false;
                    Boolean(f);
                   // console.log("no user");
                }


            })
    }catch(e){
        alert("error in the server");
    }

    console.log(f);

};