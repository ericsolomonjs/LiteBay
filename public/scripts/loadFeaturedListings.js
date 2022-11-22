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
  WHERE featured = true;
`;

pool.query(queryString)
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
  })
}).catch(err => console.error('query error', err.stack));

// successfully console logs objects for listing ids 1, 3, 4
