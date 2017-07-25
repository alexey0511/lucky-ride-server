var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://alexey:alexey@ds121483.mlab.com:21483/lucky_ride", ["bookings"])
router.get("/bookings", function(req, res, next) {
  db.bookings.find(function(err, bookings) {
    if (err) {
      res.send(err);
    }
    res.json(bookings);
  });
});

module.exports = router;


router.post("bookings", function(req, res, next) {
  var booking = req.body.data;

    if (!booking.userName) {
      res.status(400);
      res.json({
        error: "Bad data"
      });
    } else {
      db.bookings.save(booking, function(err, savedBooking) {
        if (err) {
          res.send(err);
        }
        res.json(savedBooking);
      });
    }
})
