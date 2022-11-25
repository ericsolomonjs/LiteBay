const express = require('express');
const router = express.Router();
const cookieSession = require("cookie-session");

router.use(cookieSession({
  name: "session",
  keys: ["fdj3i42o2k3ggdger644212"],
  maxAge: 24 * 60 * 60 * 1000
}));

const {
  getIsAdmin,
  getUserObjectWithID
} = require("../bin/helpers/userHelpers");

// Listing helper files
const {
  deleteListing,
  getListingWithID,
} = require("../bin/helpers/listingHelpers");

// renders admin page
router.get("/", (req, res) => {

  getIsAdmin(req.session.user_id)
    .then((adminStatus) => {
      if (adminStatus) {
        return res.render("admin_page");
      }
      return res.send("<p>You are not an admin.</p>");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.post("/:id/marksold", (req, res) => {

})


// deletes specific listing
router.post("/:id/delete", (req, res) => {

  getListingWithID(req.params.id)
    .then((listing) => {

      // if listing doesn't exist, return error message
      if (!listing) {
        return res.send("<p>Listing does not exist.</p>");
      }

      getUserObjectWithID(req.session.user_id)
        .then((loggedIn) => {
          // if user does not exist, return error message
          if (!loggedIn) {
            return res.send("<p>Please log in to delete your listing.</p>");
          }

          // if session user is owner of listing, delete listing
          if (loggedIn.id === listing.user_id) {
            deleteListing(listing.id);
            return res.redirect('/admin');
          } else {
            return res.send("<p>You are not the owner of this listing.</p>");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
});

module.exports = router;
