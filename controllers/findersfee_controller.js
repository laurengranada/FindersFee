var express = require("express");

var router = express.Router();

// Requring models
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
// This is the route to show all the posts (post.html)
router.get("/post", function(req, res) {
  db.Findersfee.findAll({}).then(function(dbFindersfee) {
    // We have access to the Findersfee as an argument inside of the callback function
   var hbsObject = { //not sure if I can put it all into one object
      item_name: dbFindersfee,
      category: dbFindersfee,
      description: dbFindersfee,
      fee: dbFindersfee,
      timestamp: dbFindersfee //not sure if this works
    };
    res.render("post", hbsObject);
   
  });
});

//Add a new item into the database
router.post("/userview", function(req, res) {
    // create takes an argument of an object describing the item we want to
    db.Findersfee.create({
    username: req.body.username,
    seeker: true,
    email: req.body.email,
    item_name: req.body.item_name,
    category: req.body.category,
    description: req.body.description,
    fee: req.body.fee,
    found: false
  }).then(function(dbFindersfee) {
      // New post is added to the database
      res.redirect("/userview");
  });
});

//find a post by username, used when user logs in
//Needs to set a variable to store username when user logs in
router.get("/userview", function(req, res) {
  db.Findersfee.findOne({where: {username: username}}).then(function(dbFindersfee) {
    // We have access to the Findersfee as an argument inside of the callback function
   var object = { //not sure if I can put it all into one object
      item_name: dbFindersfee,
      item_name: dbFindersfee,
      category: dbFindersfee,
      description: dbFindersfee,
      fee: dbFindersfee,
      timestamp: dbFindersfee //not sure if this works
    };
    res.render("userview", object);
   
  });
});

//Allow finders to respond to post
router.put("/:id", function(req, res) {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
    db.Findersfee.update({
      found: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbFindersfee) {
      res.redirect("/post");
  });
});

//Allow seeker to set post back to not found
router.put("/:id", function(req, res) {
    db.Findersfee.update({
      found: false
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbFindersfee) {
      res.redirect("/userview");
  });
});

//Delete the post once it's find
  router.delete("/:id", function(req, res) {
    db.Finders.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFindersfee) {
      res.redirect("/userview");
    });
  });


// Export routes for server.js to use.
module.exports = router;
