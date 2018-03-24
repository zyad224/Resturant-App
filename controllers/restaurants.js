var Restaurant = require('../models/restaurants');

exports.getRest = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Restaurant.find({rest_name: userData.rest},
            function (err, restaurants) {
                if (err)
                    res.status(500).send('Invalid data!');
                var restaurant = null;
                if (restaurants.length > 0) {
                    var firstElem = restaurants[0];
                    restaurant = {
                        name: firstElem.rest_name
                    };
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(restaurant));
            });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}
