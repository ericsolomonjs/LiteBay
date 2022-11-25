const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session");

const {getIsAdmin} = require("../bin/helpers/userHelpers");
const {addListing} = require("../bin/helpers/listingHelpers");

router.use(cookieSession({
  name: "session",
  keys: ["fdj3i42o2k3ggdger644212"],
  maxAge: 24 * 60 * 60 * 1000
}));

router.get("/", (req, res) => {
  getIsAdmin(req.session.user_id)
    .then((adminStatus) => {
      if (adminStatus) {
        return res.render("create_listing");
      }
      return res.send("<p>You are not authorized to create a listing.</p>");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.post("/", (req, res) => {
  const listing = req.body.listing;
  const image = req.body.image_url;
  const description = req.body.description;
  const price = req.body.price;
  const user = req.session.user_id

  if (!user) {
    res.redirect("/login");
  }  else {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();
    today = year + "-" + month + "-" + day;

    addListing(listing, image, description, price, user, false, false, today);
    res.redirect("/");
  }
})

module.exports = router;
