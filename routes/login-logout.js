const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");


const {
  getUserObjectWithEmail,
  getUserObjectWithID,
} = require("../bin/helpers/userHelpers");

// renders login page
router.get("/login", (req, res) => {
  const loggedIn = getUserObjectWithID(req.session.user_id); //fix helper

  // if logged in, redirect to "home"
  if (loggedIn) {
    return res.redirect(req.baseUrl);
  }
  return res.render("login_register");
});

// user enters information and logs in
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const authorizedUser = getUserObjectWithEmail(email);

  if (!authorizedUser) {
    return res.status(403).send("<p>Invalid credentials.</p>");
  }

  // if password does not match with stored value, return error message
  if (!bcrypt.compareSync(password, authorizedUser.hashed_password)) {
    return res.status(403).send("<p>Invalid credentials.</p>");
  } else {
    req.session.user_id = authorizedUser.id;
    return res.redirect(req.baseUrl);
  }
});

// logs user out, clears session cookies, redirect to login page
router.post("/logout", (req, res) => {
  req.session = undefined;
  return res.redirect(req.baseUrl);
});


module.exports = router;
