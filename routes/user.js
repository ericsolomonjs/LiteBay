/*
 * All routes for User are defined here
 * Since this file is loaded in server.js into /user,
 *   these routes are mounted onto /user
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session");

router.use(cookieSession({
  name: "session",
  keys: ["fdj3i42o2k3ggdger644212"],
  maxAge: 24 * 60 * 60 * 1000
}));

router.get('/', (req, res) => {
const loggedIn = req.session;

if (loggedIn) {
  res.render("user_page.ejs");
} 
else {
  res
  .status(500)
  .redirect("/login");
}
}); 

module.exports = router;
