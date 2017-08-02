var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://alexey:alexey@ds121483.mlab.com:21483/lucky_ride", ["drivers"])


router.get("/driver", function(req, res, next) {
  db.drivers.find(function(err, bookings) {
    if (err) {
      res.send(err);
    }
    res.json(bookings);
  });
});
//Get Single Driver
router.get("/driver/:id", function(req, res, next){
    db.drivers.find({_id: mongojs.ObjectId(req.params.id)},function(err, driver){
        if (err){
            res.send(err, req.params.id);
        }
        res.json(driver);
    });
});

module.exports = router;
