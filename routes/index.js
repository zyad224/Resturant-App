var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");

var rest = require('../controllers/restaurants');
var user = require('../controllers/users');

var initDB= require('../controllers/init');
initDB.init();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'My Form' });
});


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'My Form' });
});

router.get('/errorPage', function(req, res) {
    res.render('errorPage');
});

router.get('/geolocation',function(req,res,next){
    res.render('geolocation');
});

/* GET insert page. */
router.get('/insert', function(req, res) {
    if(req.session.username){
        res.render('insert', { title: 'Restaurant Sign Up Form'  });
    }else{
        res.redirect('login');
    }

});

router.get('/login', function(req, res) {
    res.render('login');
});
router.get('/webrtc', function(req, res) {

    res.render('webrtc');
});

router.post('/index',rest.getRest);

router.post('/insert',rest.insert);

router.post('/upload',rest.uploadImage);

router.post('/geolocation',rest.getLocation);


router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/sendInfo',rest.showSinglePage);

router.post('/sendFeedback',rest.sendFeedback);


router.post('/login',user.checkCredential);

router.get('/about',function(req,res){
    res.render('about');
});

router.get('/dashboard',function(req,res){
    if(req.session.username){
        res.render('dashboard',{username : req.session.username});
    }else{
        res.redirect('login');
    }
});

router.get('/logout', function (req, res) {
    req.session.username = null;
    res.redirect('index');
});




module.exports = router;
