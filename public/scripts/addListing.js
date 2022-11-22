const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// Function adds a listing to the database
const addListing = function (listing) {
  const values = [
    listing.id,
    listing.image,
    listing.text,
    listing.price,
    listing.user_id,
    listing.featured,
    listing.sold,
    listing.date_added
  ];

  const queryString = `
  INSERT INTO listings (id, image, text, price, user_id, featured, sold, date_added)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `;

  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

exports.addListing = addListing;
