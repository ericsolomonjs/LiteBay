const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const queryString = `
  SELECT *
  FROM listings
  WHERE price <= $1;
`;

const filterPrice = process.argv[2];
const values = [`${filterPrice}`];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(listing => {
      return {
        listingID: listing.id,
        imageID: listing.image_id,
        listingText: listing.text,
        listingPrice: listing.price,
        userID: listing.user_id,
        featured: listing.featured,
        sold: listing.sold,
        dateAdded: listing.date_added
      };
    });
  }).catch(err => console.error('query error', err.stack));

// successfully returns listing 2, 3, 4 when filter price is 50. returns 3, 4 when filter price is 49.
