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
  getUserObjectWithEmail,
  getUserObjectWithID,
} = require("../bin/helpers/userHelpers");

// renders login page
router.get("/", (req, res) => {
  const loggedIn = getUserObjectWithID(req.session.user_id);

  // if logged in, redirect to "home"
  if (loggedIn) {
    return res.redirect(req.baseUrl);
  }
  return res.render("login_register");
});

// user enters information and logs in
router.post("/", (req, res) => {
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

module.exports = router;
