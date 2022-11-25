const db = require('../../db/connection');

// Function adds a listing to the database
const addListing = (listing) => {
  const queryString = `
    INSERT INTO listings (listing_title, image_id, text, price, user_id, date_added)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    listing.title,
    listing.image_id,
    listing.text,
    listing.price,
    listing.user_id,
    listing.date_added
  ];

  return db
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
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

  return db
    .query(queryString, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addImage = (url, altText) => {
  const queryString = `
    INSERT INTO images (url, alt_text)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [url, altText];

  return db
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
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

  return db.query(queryString, [listingID])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const getListingsWithUsername = (username) => {

  const queryString = `
    SELECT users.username, users.email, listings.listing_title, listings.text, listings.price, listings.date_added, images.id as image_id, images.alt_text
    FROM listings
    JOIN users ON listings.user_id = users.id
    JOIN images ON listings.image_id = images.id
    WHERE users.username = '$1s';
  `;

  return db.query(queryString, [username])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const getListingsWithUserID = (userID) => {
  const queryString = `
    SELECT *
    FROM listings
    JOIN users ON listings.user_id = users.id
    WHERE id = $1;
  `;

  return db.query(queryString, [userID])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
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

  return db.query(queryString)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const getFilteredListings = (price) => {
  const queryString = `
    SELECT *
    FROM listings
    WHERE price <= $1;
  `;

  return db.query(queryString, [price])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const setListingSold = (id) => {
  const queryString = `
    UPDATE listings
    SET sold = true
    WHERE id = $1
    RETURNING *;
  `;

  return db
    .query(queryString, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

setImageSold = (id) => {
  const queryString = `
    UPDATE images
    SET url = 'https://thumbs.dreamstime.com/b/sold-sign-sticker-stamp-vector-texture-154049307.jpg'
    WHERE id = $1
    RETURNING *;
  `;

  return db
    .query(queryString, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const setFeatured = (id) => {
  const queryString = `
    UPDATE listings
    SET featured = true
    WHERE id = $1
    RETURNING *;
  `;

  return db
    .query(queryString, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

module.exports = {
  addListing,
  addImage,
  deleteListing,
  getListingWithID,
  getListingsWithUsername,
  getListingsWithUserID,
  getHtmlListingCard,
  getFeaturedListings,
  getFilteredListings,
  setListingSold,
  setFeatured
};
