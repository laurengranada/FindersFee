var express = require("express");

var router = express.Router();

// Requring models
var db = require("../models");
// / Dependencies
// // =============================================================

var path = require("path"); ///trying this 11:23 pm friday 3/3/17

// //Routes 
// // =============================================================Trying line 18 thru 26 friday 11:23pm 3/3/17

//module.exports = function(app){//might need this????

// Basic route that sends the user first to the index page
router.get("/", function(req, res) {
  res.sendFile(path.join(
__dirname, "/../views/index"));
});

router.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "/../views/seekerlogin"));   ///probably need a function to split 
  //into seeker and finder pages depending on which button they choose
});
//testing this 3/6/17 12:12 am===============================================

// directed to main index page ==================================
  //seeker login
router.get("/index", function(req, res) {
  // 
    res.render("index");
   
  });
  ///========================================================================
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
      timestamps: dbFindersfee //not sure if this works
    };
    res.render("post", hbsObject);
     // res.render('post', { findersfee: hbsObject});   ///just entered this 12pm 3/3/17 and it works
   
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
    res.render("userview", object); ///need to get form data from /userview for this to work
   
  });
});

//Allow finders to respond to post
router.put("/post/:id", function(req, res) {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
    db.Findersfee.update({
      found: true,
      finders_email: req.body.finders_email
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbFindersfee) {
      console.log(req.body);
      res.redirect("/post");
  });
});

//Allow seeker to set post back to not found
router.put("userview/:id", function(req, res) {
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
  router.delete("userview/:id", function(req, res) {
    db.Finders.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFindersfee) {
      res.redirect("/userview");
    });
  });
  //creating all of the routes below friday
//=============================================Log In Pages=========================================

  // directed to seeker login page ==================================
  //seeker login
router.get("/seekerlogin", function(req, res) {
  // 
    res.render("seeker");
   
  });
// directed to finder login page ==================================
  //finder login
router.get("/finderlogin", function(req, res) {
  // 
    res.render("finder");

 });
//============================================ Form Pages===================================
    // directed to Seeker's 2nd page after logged in and enters their info to find===========
  //Seeker enters info into a form here
router.get("/seekerform", function(req, res) {
  // 
    res.render("seekerform");
   
  });
   
 

// Items to find selection and search form ==================================
  //finder will choose or do a search for items here=========================
router.get("/selectionform", function(req, res) {
  // 
    res.render("selectionform");
   
  });

//After a Finder chooses an item this form will come up that will ask them to enter 
// the item's location info and details to where the item can be found

// directed to seeker login page ==================================
  //seeker login
router.get("/itemlocate", function(req, res) {
  // 
    res.render("itemlocate");
   
  });

//This page comes up after the finder enters his/her "found" info and it matches to item and 
//is stated as successfully located
// directed to seeker login page ==================================
  //seeker login
router.get("/dealdone", function(req, res) {
  // 
    res.render("deal");
   
  });
    

    //probably get rid of this and replace it with the form data info because it doesn't work-duh!

  //   router.get("/userview", function(req, res) {
  // // 
  //   res.render("userview");
   
  // });
// Export routes for server.js to use.
module.exports = router;
