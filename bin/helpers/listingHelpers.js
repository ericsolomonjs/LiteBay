// const db = require('../../db/connection');
const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// Function adds a listing to the database
const addListing = (listing) => {
  const queryString = `
  INSERT INTO listings (image, text, price, user_id, featured, date_added)
  VALUES ($1, $2, $3, $4, $5, $6,)
  RETURNING *;
  `;
  const values = [
    listing.image,
    listing.text,
    listing.price,
    listing.user_id,
    listing.featured,
    listing.date_added
  ];

  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// Function deletes listing from database
const deleteListing = (id) => {
  const queryString = `
  DELETE FROM listings
  WHERE listings.id = $1
  `;

  return pool
  .query(queryString, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// get all listings for a user
const getListingWithID = (listingID) => {
  const queryString = `
    SELECT *
    FROM listings
    WHERE id = $1;
  `;

  pool.query(queryString, [listingID])
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
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getListingsWithUsername = (username) => {
  let listings = null;

  // use SELECT * if this is not efficient.
  const queryString = `
    SELECT users.username, users.email, listings.listing_title, listings.text, listings.price, listings.date_added, images.id as image_id, images.alt_text
    FROM listings
    JOIN users ON listings.user_id = users.id
    JOIN images ON listings.image_id = images.id
    WHERE users.username = '$1s';
  `;

  pool.query(queryString, [username])
    .then(result => {
      result.rows.forEach((result) => {
        listings += result;
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  return listings;
};

const getListingsWithUserID = (userID) => {
  const queryString = `
    SELECT *
    FROM listings
    JOIN users ON listings.user_id = users.id
    WHERE id = $1;
  `;

  pool.query(queryString, [userID])
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
};

const getHtmlListingCard = (listingObject) => {
  const listing = `
    <article class="listing-article">
    <div>
      <img class="listing-img" src=${listingObject.image_id} alt=${listingObject.alt_text}>
      <p class="sold">
        Sold!
      <p>
    </div>
    <div>
      <p class="listing-title">${listingObject.listing_title}</p>
      <p class="listing-price">${listingObject.price}</p>
      <p class="posted-by-user">
        User: ${listingObject.username}
      </p>
      <p class="posted-date">
        ${listingObject.date_added}
      </p>
      <button class="favourite-button" type="submit" buttonmethod="POST" buttonaction="/favourite/:post_id">
        <% if(${listingObject.favourite}){ %>
          <i class="fa-solid fa-bookmark"></i>
        <% } else { %>
          <i class="fa-regular fa-bookmark"></i>
        <% }%>
      </button>
    </div>
    <div>
      <p class="listing-text">${listingObject.text}</p>
      <a href="mailto:${listingObject.email}">Email Us</a>
    </div>
  </article>
    `;

  return listing;
};

const getFeaturedListings = () => {
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
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getFilteredListings = (price) => {
  const queryString = `
    SELECT *
    FROM listings
    WHERE price <= $1;
  `;

  pool.query(queryString, [price])
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
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const setListingSold = (id) => {
  const queryString = `
  UPDATE listings
  SET listings.sold = true
  WHERE listings.id = $1
  `;

  return pool
    .query(queryString, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  addListing,
  deleteListing,
  getListingWithID,
  getListingsWithUsername,
  getListingsWithUserID,
  getHtmlListingCard,
  getFeaturedListings,
  getFilteredListings,
  setListingSold
};
