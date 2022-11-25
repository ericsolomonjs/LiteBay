const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['fdj3i42o2k3ggdger644212'],
  maxAge: 24 * 60 * 60 * 1000
}));

const {
  checkFavourite,
  setFavourite,
  removeFavourite
} = require('../bin/helpers/userHelpers');

// adds a list to users favourites list
router.post('/:id', (req, res) => {

  // if user not logged in, return error message
  if (!req.session.user_id) {
    return res.send('<p>Please login to favourite a listing.</p>');
  }

  // add a check to see if you already favourite a specific post
  checkFavourite(req.session.user_id, req.params.id)
    .then((result) => {

      if (result) {
        return res.send('<p>You have already favourited this listing.</p>');
      }

      setFavourite(req.session.user_id, req.params.id)
        .then(() => {
          return res.redirect(req.get('referer'));
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
});

// removes a listing from users favourites list
router.post('/:id/delete', (req, res) => {

  // if user not logged in, return error message
  if (!req.session.user_id) {
    return res.send('<p>Please login to favourite a listing.</p>');
  }

  removeFavourite(req.session.user_id, req.params.id)
    .then(() => {
      return res.redirect(req.get('referer'));
    })
    .catch((error) => {
      console.log(error.message);
    });
});


module.exports = router;
