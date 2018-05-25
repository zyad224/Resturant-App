/*
This is the model of the user.
Every user has username and password.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema(
    {
        user_name: {type: String, max: 100},
        password: {type: String,max: 100}
    }
);

User.set('toObject', {getters: true, virtuals: true});


var userModel = mongoose.model('User', User );

module.exports = userModel;