/*
 * All routes for Listing Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const listingQueries = require('../db/queries/listings');

router.get('/', (req, res) => {
  listingQueries.getListings()
    .then(listings => {
      res.json({ listings });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/featured/', (req,res) => {
  listingQueries.getFeatured()
  .then(listings => {
    res.json({ listings });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
})

router.get('/notfeatured/', (req,res) => {
  listingQueries.getNotFeatured()
  .then(listings => {
    res.json({ listings });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
})

  router.get('/favourites/', (req,res) => {
    listingQueries.getFavourites()
    .then(listings => {
      res.json({ listings });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  
})

module.exports = router;
