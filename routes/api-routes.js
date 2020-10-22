// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/animals", (req, res) => {
    // get /api/animals?animalType=dog&zip=92116
    if (!req.query.animalType) {
      res.status(400).json({ message: "must provide animalType" });
    } else if (!req.query.zip) {
      res.status(400).json({ message: "must provide zip" });
    } else {
      res.json({
        animals: [
          {
            id: 124,
            organization_id: "NJ333",
            url:
              "https://www.petfinder.com/cat/nebula-124/nj/jersey-city/nj333-petfinder-test-account/?referrer_id=d7e3700b-2e07-11e9-b3f3-0800275f82b1",
            type: "Cat",
            species: "Cat",
            breeds: {
              primary: "American Shorthair",
              secondary: null,
              mixed: false,
              unknown: false
            },
            colors: {
              primary: "Tortoiseshell",
              secondary: null,
              tertiary: null
            },
            age: "Young",
            gender: "Female",
            size: "Medium",
            coat: "Short",
            name: "Nebula",
            description:
              "Nebula is a shorthaired, shy cat. She is very affectionate once she warms up to you.",
            photos: [
              {
                small:
                  "https://photos.petfinder.com/photos/pets/124/1/?bust=1546042081&width=100",
                medium:
                  "https://photos.petfinder.com/photos/pets/124/1/?bust=1546042081&width=300",
                large:
                  "https://photos.petfinder.com/photos/pets/124/1/?bust=1546042081&width=600",
                full:
                  "https://photos.petfinder.com/photos/pets/124/1/?bust=1546042081"
              }
            ],
            videos: [
              {
                embed:
                  '<iframe src="https://www.youtube.com/embed/xaXbs1fRFRM" frameborder="0" allowfullscreen></iframe>'
              }
            ],
            status: "adoptable",
            attributes: {
              spayed_neutered: true,
              house_trained: true,
              declawed: false,
              special_needs: false,
              shots_current: true
            },
            environment: {
              children: false,
              dogs: true,
              cats: true
            },
            tags: ["Cute", "Intelligent", "Playful", "Happy", "Affectionate"],
            contact: {
              email: "petfindertechsupport@gmail.com",
              phone: "555-555-5555",
              address: {
                address1: null,
                address2: null,
                city: "Jersey City",
                state: "NJ",
                postcode: "07097",
                country: "US"
              }
            },
            published_at: "2018-09-04T14:49:09+0000",
            distance: 0.4095,
            _links: {
              self: {
                href: "/v2/animals/124"
              },
              type: {
                href: "/v2/types/cat"
              },
              organization: {
                href: "/v2/organizations/nj333"
              }
            }
          }
        ],
        pagination: {
          count_per_page: 20,
          total_count: 320,
          current_page: 1,
          total_pages: 16,
          _links: {}
        }
      });
    }
  });
};
