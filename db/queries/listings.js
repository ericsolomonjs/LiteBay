const db = require('../connection');

const getListings = () => {
  return db.query('SELECT * FROM listings;')
    .then(data => {
      return data.rows;
    });
};

const getFeatured = () => {
  return db.query('SELECT * FROM listings WHERE featured = true;')
    .then(data => {
      return data.rows;
    });
};

const getNotFeatured = () => {
  return db.query('SELECT * FROM listings WHERE featured = false;')
    .then(data => {
      return data.rows;
    });
};

const getFavourites = (username) => {
  return db.query(`SELECT * FROM listings 
  JOIN favourites ON listings.id=favourties.listings_id 
  JOIN users ON favourites.user_id=users.id
  WHERE username = ${username};`)
    .then(data => {
      return data.rows;
    });
};


module.exports = { 
  getListings,
  getFeatured,
  getNotFeatured,
  getFavourites 
};
