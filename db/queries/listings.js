const db = require('../connection');

const getListings = async () => {
  const data = await db.query(`SELECT * FROM listings;`);
  return data.rows;
};

const getFeatured = async () => {
  //fix this query to be secure data wise
  const data = await db.query(`SELECT * FROM listings 
  JOIN users ON users.id = listings.user_id
  JOIN images ON images.id = listings.image_id
  WHERE featured = true;`);
  return data.rows;
};

const getNotFeatured = async () => {
  const data = await db.query('SELECT * FROM listings WHERE featured = false;');
  return data.rows;
};

//fix get favourites here
const getFavourites = async (username) => {
  const data = await db.query(`SELECT * FROM listings 
  JOIN favourites ON listings.id=favourites.listing_id 
  JOIN users ON favourites.user_id=users.id
  WHERE username = ${username};`);
  return data.rows;
};

module.exports = {
  getListings,
  getFeatured,
  getNotFeatured,
  getFavourites
};
