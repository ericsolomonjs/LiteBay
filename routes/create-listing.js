const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

const { getIsAdmin } = require('../bin/helpers/userHelpers');
const { addListing, addImage } = require('../bin/helpers/listingHelpers');

router.use(cookieSession({
  name: 'session',
  keys: ['fdj3i42o2k3ggdger644212'],
  maxAge: 24 * 60 * 60 * 1000
}));

// renders create listing page
router.get('/', (req, res) => {

  // admin authentication
  getIsAdmin(req.session.user_id)
    .then((adminStatus) => {
      if (adminStatus) {
        return res.render('create_listing');
      }
      return res.send('<p>You are not authorized to create a listing.</p>');
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.post('/', (req, res) => {
  const user_id = req.session.user_id;

  // admin authentication
  getIsAdmin(user_id)
    .then((adminStatus) => {
      if (adminStatus) {
        const image_url = req.body.image_url;
        const alt_text = 'alt text';
        const title = req.body.listing;
        const text = req.body.description;
        const price = Number(req.body.price);

        var date_added = new Date();
        var day = String(date_added.getDate()).padStart(2, '0');
        var month = String(date_added.getMonth() + 1).padStart(2, '0');
        var year = date_added.getFullYear();
        date_added = `${year}-${month}-${day}`;

        addImage(image_url, alt_text)
          .then((result) => {

            console.log('result: ', result);

            addListing({
              title,
              image_id: result.id,
              text,
              price,
              user_id,
              date_added
            }).then(() => {
              return res.redirect('/admin');
            })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    })
    .catch((error) => {
      console.log(error.message);
      return res.send('<p>You are not authorized to create a listing.</p>');
    });
});

module.exports = router;
