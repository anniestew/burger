var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");


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
  
  router.put('/burgers/:id', function(req, res) {
    console.log("router put")
    var condition = 'id = ' + req.params.id;
    console.log(condition)
  
    burger.updateOne({
        devoured: true
    },  condition, function(result) {
      console.log("back from update")
      console.log(result)
   
      res.sendStatus(200);
    
      
    });
  });

// Export routes for server.js to use.
module.exports = router;