const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant', // may need to change
  password: '123',
  host: 'localhost',
  database: 'test_db' // change to project db name
});

const queryString = `
  SELECT *
  FROM listings
  WHERE featured = true;
`;

pool.query(queryString)
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
    }); // think it should be a return. figure out how to return all listing content in a single variable, not [object Object]
  })
}).catch(err => console.error('query error', err.stack));

// successfully console logs objects for listing ids 1, 3, 4
