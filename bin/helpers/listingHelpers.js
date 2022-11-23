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

const deleteListing = function(id) {
  const queryString = `
  DELETE FROM listings
  WHERE listing.id = $1
  `;

  const values = [`${id}`];

  return pool
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.log(error.message);
  });
}

function getListings(username) {
  let listings = null;

  // consider selecting specific items instead of *, for efficiency purposes
  const queryString = `
    SELECT *
    FROM listings
    FULL JOIN users ON listings.user_id = users.id
    FULL JOIN images ON listings.image_id = images.id
    FULL JOIN favourite ON favourite.user_id =
    WHERE users.username LIKE $1
  `;
  const values = [`${username}`];

  pool.query(queryString, values)
    .then(res => {
      res.rows.forEach(() => {
        listings += res.listing.id; // what is "res.listings.id", just id or whole object? there is probably an error with this line.
      });
    }).catch(err => console.error('query error', err.stack));

  return listings;
}

function displayListings(favoritesObject) {
  const $listings = `
    <article class="listing-article">
    <div>
      <img class="listing-img" src=${favoritesObject.image_id} alt=${favoritesObject.alt_text}>
      <p class="sold">
        Sold!
      <p>
    </div>
    <div>
      <p class="listing-title">${favoritesObject.listing_title}</p>
      <p class="listing-price">${favoritesObject.price}</p>
      <p class="posted-by-user">
        User: ${favoritesObject.username}
      </p>
      <p class="posted-date">
        ${favoritesObject.date_added}
      </p>
      <button class="favourite-button" type="submit" buttonmethod="POST" buttonaction="/favorite/:post_id">
        <% if(${favoritesObject.favourite}){ %>
          <i class="fa-solid fa-bookmark"></i>
        <% } else { %>
          <i class="fa-regular fa-bookmark"></i>
        <% }%>
      </button>
    </div>
    <div>
      <p class="listing-text">${favoritesObject.text}</p>
      <a href="mailto:${favoritesObject.email}">Email Us</a>
    </div>
  </article>
    `;

  return $listings;
};

function loadFeaturedListings() {
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
}

function loadFilteredPosts (price) {
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
}

function loadListingID(listingID) {
  const queryString = `
    SELECT *
    FROM listings
    WHERE id = $1;
  `;

  const listingID = process.argv[2];
  const values = [`${listingID}`];

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
}

function loadUsersListings (listingID) {
  const queryString = `
    SELECT *
    FROM listings
    WHERE id = $1;
  `;

  const listingID = process.argv[2];
  const values = [`${listingID}`];

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
}

const setListingSold = function(id) {
  const queryString = `
  UPDATE listings
  SET listings.sold = true
  WHERE listings.id = $1
  `;
  const values = [`${id}`];

  return pool
  .query(queryString, values)
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.log(error.message);
  });
}

module.exports = {
  addListing,
  deleteListing,
  displayListings,
  getListings,
  loadFeaturedListings,
  loadFilteredPosts,
  loadListingID,
  loadUsersListings,
  setListingSold
}