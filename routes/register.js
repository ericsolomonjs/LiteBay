const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");

const {
  addUser,
} = require("../bin/helpers/userHelpers");

// renders user registration page
router.get("/register", (req, res) => {
  const userID = req.session.user_id;
  const loggedIn = getUserObject(userID); // UPDATE WITH CORRECT HELPER FX

  if (loggedIn) {
    return res.redirect(req.baseUrl);
  }

  return res.render("login_register");
});

// user submits data for registration, account is created
router.post("/register", (req, res) => {
  const fullName = req.body.fullName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // if either text field is empty, return error message
  if (!fullName || !username || !email || !password) {
    return res.status(400).send("<p>A text field was left blank.</p>");
  }

  // if username or email exists in database, return error message
  if (getUserObject({username, email})) {
    return res.status(400).send("<p>Account with username/email already exists.</p>");
  }

  addUser({
    username,
    email,
    hashedPassword: bcrypt.hashSync(password, 10),
    fullName
  }) // takes in user object and inserts into db

  req.session.user_id = getUserID(username);

  return res.redirect(req.baseUrl);
});

module.exports = router;
