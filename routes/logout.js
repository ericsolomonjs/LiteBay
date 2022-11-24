const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session");

router.use(cookieSession({
  name: "session",
  keys: ["fdj3i42o2k3ggdger644212"],
  maxAge: 24 * 60 * 60 * 1000
}));

// logs user out, clears session cookies, redirect to home page
router.post("/", (req, res) => {
  req.session = undefined;

  return res.redirect('/')
});

module.exports = router;
