// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //using redirect until index page is completed
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/search", (req, res) => {
    res.render("search");
  });

  app.get("/results", (req, res) => {
    res.render("results");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  // CODE BELOW NEEDS TO BE SORTED AND CONNECTED EVENTUALLY

  // app.get("/members", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });
};
