var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var formidable=require('formidable');
var fs=require('fs');
var TITLE='upload picutre';
// var AVATAR_UPLOAD_FOLDER='/avatar';


var rest = require('../controllers/restaurants');
var initDB= require('../controllers/init');
initDB.init();


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: TITLE });
});

router.post('/index', function(req,res){
    var form = new formidable.IncomingForm();   //create the form for uploading
    form.encoding = 'utf-8';        //set the en-coding
    form.uploadDir = 'public/avatar/';     //set the uploading directory
    form.keepExtensions = true;     //keep the suffix
    form.maxFieldsSize = 2 * 1024 * 1024;   //the size of file

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.locals.error = err;
            res.render('index', { title: TITLE });
            return;
        }

        var extName = '';  //suffix
        console.log("files.fulAvatar.type="+files.fulAvatar.type);
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0){
            res.locals.error = 'only support png and jpg format';
            res.render('index', { title: TITLE });
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        console.log(newPath);
        fs.renameSync(files.fulAvatar.path, newPath);  //rename
    });

    res.locals.success = 'successfully upload';
    res.render('index', { title: TITLE });
});


router.get('/map',function(req,res,next){
   res.render('map');
});

/* GET insert page. */
router.get('/insert', function(req, res, next) {
    res.render('insert', { title: 'My Form' });
});
router.post('/insert',rest.insert);

module.exports = router;
