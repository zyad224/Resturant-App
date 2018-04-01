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

router.get('/map',function(req,res,next){
   res.render('map');
});

/* GET insert page. */
router.get('/insert', function(req, res, next) {
    res.render('insert', { title: 'My Form' });
});
router.post('/insert',rest.insert);

router.post('/upload', function (req, res) {
    req.file('avatar').upload({dirname:'../../public/avatar'},function (err, uploadedFiles) {

        if (err) return res.send(500, err);
        return res.json({
            message: uploadedFiles.length + ' file(s) uploaded successfully!',
            files: uploadedFiles
        });
    });
});

module.exports = router;
