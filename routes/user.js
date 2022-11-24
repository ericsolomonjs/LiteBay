/*
 * All routes for User are defined here
 * Since this file is loaded in server.js into /user,
 *   these routes are mounted onto /user
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  if (req.session.user_id) {
    res.render('user_page.ejs');
  } else {
    res.redirect('login');
  }
}); 

module.exports = router;
