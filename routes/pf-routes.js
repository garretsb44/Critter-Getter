const axios = require("axios");
const { PETFINDER_ID, PETFINDER_SECRET } = process.env;

module.exports = function(app) {
  app.get("/api/animals", async (req, res) => {
    const { animalType, zip } = req.query;
    if (!animalType) {
      res.status(400).json({ message: "must provide animalType" });
    } else if (!zip) {
      res.status(400).json({ message: "must provide zip" });
    } else {
      axios({
        method: "post",
        url: "https://api.petfinder.com/v2/oauth2/token",
        data: `grant_type=client_credentials&client_id=${PETFINDER_ID}&client_secret=${PETFINDER_SECRET}`
      })
        .then(function(response) {
          const token = response.data.access_token;
          return axios({
            meth: "get",
            url: `https://api.petfinder.com/v2/animals?type=${animalType}&location=${zip}`,
            headers: { Authorization: `Bearer ${token}` }
          });
        })
        .then(response => {
          res.json(response.data);
        })
        .catch(function(error) {
          console.log(error);
          res.sendStatus(500);
        });
    }
  });
};
