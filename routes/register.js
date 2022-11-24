const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");

router.use(cookieSession({
  name: "session",
  keys: ["fdj3i42o2k3ggdger644212"],
  maxAge: 24 * 60 * 60 * 1000
}));

const {
  addUser,
  getUserObjectWithUsername,
  getUserObjectWithEmail,
  getUserIDWithUsername
} = require("../bin/helpers/userHelpers");

// user submits data for registration, account is created
router.post("/", (req, res) => {
  const fullName = req.body.fullName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // if either text field is empty, return error message
  if (!fullName || !username || !email || !password) {
    return res.status(400).send("<p>A text field was left blank.</p>");
  }

  // if username or email exists in database, return error message
  if (getUserObjectWithEmail(email) || getUserObjectWithUsername(username)) {
    return res.status(400).send("<p>Account with that email/username already exists.</p>");
  }

  addUser({
    username,
    email,
    hashedPassword: bcrypt.hashSync(password, 10),
    fullName
  }) // takes in user object and inserts into db

  req.session.user_id = getUserIDWithUsername(username);

  // return res.redirect(req.baseUrl.splice(1)); ask mentor about req.baseURL
  return res.redirect('http://localhost:8080/')
});

module.exports = router;
