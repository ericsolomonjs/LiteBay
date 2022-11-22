const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber', // may need to change
  password: 'labber',
  host: 'localhost',
  database: 'midterm' // change to project db name
});

const queryString = `
  SELECT *
  FROM listings
  WHERE user_id = $1;
`;

const userID = process.argv[2];
const values = [`${userID}`];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(listing => {
    console.log({
      listingID: listing.id,
      imageID: listing.image_id,
      listingText: listing.text,
      listingPrice: listing.price,
      userID: listing.user_id,
      featured: listing.featured,
      sold: listing.sold,
      dateAdded: listing.date_added
    }); // should be a return. figure out how to return all listing content in a single variable, but listing = [object Object]
  })
}).catch(err => console.error('query error', err.stack));

// successfully returns listing 2, 3, 4 when filter price is 50. returns 3, 4 when filter price is 49.
