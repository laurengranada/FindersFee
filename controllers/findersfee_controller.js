var express = require("express");

var router = express.Router();

// Requring models
var db = require("../models");
// / Dependencies
// // =============================================================

var path = require("path"); 

// Routes 
// directed to main index page ==================================
  //seeker login
router.get("/", function(req, res) {
  // 
    res.render("index");
   
  });

// directed to main index page ==================================
  //seeker login
// router.get("/index", function(req, res) {
//   // 
//     res.render("index");
   
//   });
  //========================================================================
// Create all our routes and set up logic within those routes where required.
// This is the route to show all the posts (post.handlebars)
router.get("/post", function(req, res) {
  db.Findersfee.findAll({}).then(function(dbFindersfee) {
    // We have access to the Findersfee as an argument inside of the callback function
   var hbsObject = { //not sure if I can put it all into one object
      id: dbFindersfee,
      item_name: dbFindersfee,
      category: dbFindersfee,
      description: dbFindersfee,
      fee: dbFindersfee,
    };
    res.render("post", hbsObject);
   
  });
});

//Add a new item into the database
router.post("/userview", function(req, res) {
  var username = "Gengar";
    // create takes an argument of an object describing the item we want to
    db.Findersfee.create({
    username: username,
    seeker: true,
    email: req.body.email,
    item_name: req.body.item_name,
    category: req.body.category,
    description: req.body.description,
    fee: req.body.fee,
    found: false
  }).then(function(dbFindersfee) {
      // New post is added to the database
      res.redirect("/userpost"); 
  });
});

//find a post by username, used when user logs in
//Needs to set a variable to store username when user logs in
router.get("/userview", function(req, res) {
  var username = 'Gengar'; //hardcode, needs to take this out once login works
  db.Findersfee.findOne({where: {username: username}}).then(function(dbFindersfee) {
    // We have access to the Findersfee as an argument inside of the callback function
   var object = { 
      item_name: dbFindersfee,
      item_name: dbFindersfee,
      category: dbFindersfee,
      description: dbFindersfee,
      fee: dbFindersfee,
      timestamp: dbFindersfee //needs to look up syntax
    };
    res.render("userview", object); 
   
  });
});

router.get("/userpost", function(req, res) {
  var username = 'Gengar'; //hardcode, needs to take this out once login works
  db.Findersfee.findAll({where: {username: username}}).then(function(dbFindersfee) {
    // We have access to the Findersfee as an argument inside of the callback function
   var object = { 
      item_name: dbFindersfee,
      item_name: dbFindersfee,
      category: dbFindersfee,
      description: dbFindersfee,
      fee: dbFindersfee,
      found: dbFindersfee,
      finders_email: dbFindersfee,
      timestamp: dbFindersfee //needs to look up syntax
    };
    res.render("userpost", object); 
   
  });
});

//Allow finders to respond to post
router.put("/post/:id", function(req, res) {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update

var findersemail = "";
for(var i=0; i < req.body.finders_email.length; i++) {
  if(null != req.body.finders_email[i] && "" != req.body.finders_email[i]) {
    findersemail = req.body.finders_email[i];
    break;
  }
}

    db.Findersfee.update({
      found: true,
      finders_email: findersemail  
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbFindersfee) {
     res.redirect("/post");
  });
});

//Allow seeker to set post back to not found
router.put("userpost/:id", function(req, res) {
    db.Findersfee.update({
      found: false
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbFindersfee) {
      res.redirect("/userpost");
  });
});

//Delete the post once it's find
  router.delete("/userpost/:id", function(req, res) {
    db.Findersfee.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFindersfee) {
      res.redirect("/userpost");
    });
  });

  // directed to seeker login page ==================================
  //seeker login
router.get("/seekerlogin", function(req, res) {
  // 
    res.render("seeker");
   
  });

// Export routes for server.js to use.
module.exports = router;