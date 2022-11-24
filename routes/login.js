const express = require('express');
const router = express.Router();
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
  getUserObjectWithID(req.session.user_id)
    .then((loggedIn) => {
      // if logged in, redirect to "home"
      if (loggedIn) {
        return res.redirect("/");
      }
      return res.render("login_register");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// user enters information and logs in
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  getUserObjectWithEmail(email)
    .then((authorizedUser) => {
      // if logged in, redirect to "home"
      if (!authorizedUser) {
        return res.status(403).send("<p>Invalid credentials.</p>");
      }

      // if password does not match with stored value, return error message
      if (!bcrypt.compareSync(password, authorizedUser.hashed_password)) {
        return res.status(403).send("<p>Invalid credentials.</p>");
      } else {
        req.session.user_id = authorizedUser.id;
        return res.redirect('/');
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
});

module.exports = router;
