var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");

var rest = require('../controllers/restaurants');
var initDB= require('../controllers/init');
initDB.init();


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'My Form' });
});

router.get('/geolocation',function(req,res,next){
    res.render('geolocation');
});

/* GET insert page. */
router.get('/insert', function(req, res, next) {
    res.render('insert', { title: 'My Form' });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/index',rest.getRest);

router.post('/insert',rest.insert);

router.post('/upload',rest.uploadImage);

router.post('/geolocation',rest.getLocation);

/*Restaurant*/
router.get('/restaurant',function(req,res,next){
    res.render('restaurant');
});

/*Retrieve Restaurant Page From DB*/
router.post('/restaurant',rest.getSpecificRest);

module.exports = router;
