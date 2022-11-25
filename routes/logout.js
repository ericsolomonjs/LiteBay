const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['fdj3i42o2k3ggdger644212'],
  maxAge: 24 * 60 * 60 * 1000
}));

// logs user out, clears session cookies
// changed to GET from POST to match with Ryans logout button
router.get('/', (req, res) => {
  req.session = undefined;

  // redirect to home page
  return res.redirect('/')
});

module.exports = router;
