var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });
  
  router.post('/burgers', function(req, res) {
    console.log("name: ", req.body.name)
    burger.insertOne([
      'burger_name'
    ], [
        req.body.name
     
    ], function(data) {
      res.redirect('/');
    });
  });
  
  router.put('api/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;
    console.log(condition)
  
    burger.updateOne({
      devoured: true
    }, condition, function(data) {
      res.json(data)
      //res.redirect('/');
    });
  });

// Export routes for server.js to use.
module.exports = router;
