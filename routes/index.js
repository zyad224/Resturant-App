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

/* GET insert page. */
router.get('/insert', function(req, res, next) {
    res.render('insert', { title: 'My Form' });
});
router.post('/insert',rest.addRest);
router.post('/index', rest.getRest);

module.exports = router;
