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
  const isAdmin = getIsAdmin(req.session.user_id);

  if (!isAdmin) {
    res.redirect("/login");
    return res.send("<p> Please log in to create listing. </p>");
  }

  res.render("create_listing");
})

router.post("/", (req, res) => {
  const listing = req.body.listing;
  const image = req.body.image-url;
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

    addListing(listing, image, description, price, user, FALSE, FALSE, today);
    res.redirect("/");
  }
})

module.exports = router;
