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
  const data = await db.query(`SELECT * FROM listings 
  JOIN users ON users.id = listings.user_id
  JOIN images ON images.id = listings.image_id
  WHERE featured = false;`);
  return data.rows;
};

//fix get favourites here
const getFavourites = async (userID) => {
  const data = await db.query(`SELECT * FROM listings 
  JOIN favourites ON listings.id=favourites.listing_id 
  JOIN users ON favourites.user_id=users.id
  JOIN images ON images.id = listings.image_id
  WHERE users.id = ${userID};`);
  return data.rows;
};

const getFiltered20Listings = async () => {
  const data = await db.query(`SELECT * FROM listings 
  JOIN users ON listings.user_id=users.id
  JOIN images ON images.id = listings.image_id
  WHERE listings.price < 20;`);
  return data.rows;
}
const getFiltered50Listings = async () => {
  const data = await db.query(`SELECT * FROM listings 
  JOIN users ON listings.user_id=users.id
  JOIN images ON images.id = listings.image_id
  WHERE listings.price < 50;`);
  return data.rows;
}

module.exports = {
  getListings,
  getFeatured,
  getNotFeatured,
  getFavourites,
  getFiltered20Listings,
  getFiltered50Listings
};
