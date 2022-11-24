const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session");

router.use(cookieSession({
  name: "session",
  keys: ["fdj3i42o2k3ggdger644212"],
  maxAge: 24 * 60 * 60 * 1000
}));

const {
  getUserObjectWithID,
} = require("../bin/helpers/userHelpers");

// Listing helper files
const {
  deleteListing,
  getListingWithID,
  getListingsWithUserID,
} = require("../bin/helpers/listingHelpers");

// renders admin page
router.get("/", (req, res) => {
  const loggedIn = getUserObjectWithID(req.session.user_id);

  // if logged in, redirect to "admin"
  if (loggedIn) {
    return res.redirect(req.baseUrl + "/admin");
  }
  return res.render("login_register");
});

// renders admin page, and listing associated with userID
router.get("/", (req, res) => {
  const loggedIn = getUserObjectWithID(req.session.user_id);

  // if user does not exist, return error message
  if (!loggedIn) {
    return res.send("<p>Please log in to view your listing's.</p>");
  }

  return res.render("admin_page", getListingsWithUserID(req.session.user_id));
});

// deletes specific listing
router.post("/listing/delete", (req, res) => {
  const loggedIn = getUserObjectWithID(req.session.user_id);
  const listing = getListingWithID(req.params.id);

  // if listing doesn't exist, return error message
  if (!listing) {
    return res.send("<p>Listing does not exist.</p>");
  }

  // if user does not exist, return error message
  if (!loggedIn) {
    return res.send("<p>Please log in to delete your listing.</p>");
  }

  // if session user is owner of listing, delete listing
  if (loggedIn.id === listing.user_id) {
    deleteListing(listing.id)
    return res.redirect(req.baseUrl + "/admin");
  } else {
    return res.send("<p>You are not the owner of this Short URL ID.</p>");
  }
});

 module.exports = router;
