const express = require('express');
const router  = express.Router();


app.get("/", (req, res) => {
  const isAdmin = getIsAdmin(req.session.user_id);

  if (!isAdmin) {
    res.redirect("/login");
    return res.send("<p> Please log in to create listing. </p>");
  }

  res.render("create_listing");
})

app.post("/", (req, res) => {
  const listing = req.body.listing;
  const image = req.body.image-url;
  const description = req.body.description;
  const price = req.body.price;
  const user = req.session.user_id
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  else {
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