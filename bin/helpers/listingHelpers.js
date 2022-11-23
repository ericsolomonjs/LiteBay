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
  INSERT INTO listings (id, image, text, price, user_id, featured, sold, date_added)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `;
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

  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const deleteListing = (id) => {
  const queryString = `
  DELETE FROM listings
  WHERE listing.id = $1
  `;

  return pool
    .query(queryString, id)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getListings = (username) => {
  let listings = null;

  // use SELECT * if this is not efficient.
  const queryString = `
    SELECT users.username, users.email, listings.listing_title, listings.text, listings.price, listings.date_added, images.id, images.alt_text, favourites.id
    FROM listings
    JOIN users ON listings.user_id = users.id
    JOIN images ON listings.image_id = images.id
    JOIN favourite ON favourite.user_id = users.id
    users.username LIKE $1
  `;

  // I THINK THIS NEEDS TO BE FIXED, UNSURE.
  pool.query(queryString, username)
    .then(result => {
      result.rows.forEach((result) => {
        listings += result.listing.id; // what is "res.listings.id", just id or whole object? there is probably an error with this line.
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  return listings;
};

const displayListings = (favoritesObject) => {
  const listings = `
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

  return listings;
};

const loadFeaturedListings = () => {
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

const loadFilteredPosts = (price) => {
  const queryString = `
    SELECT *
    FROM listings
    WHERE price <= $1;
  `;

  pool.query(queryString, price)
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

const loadListingID = (listingID) => {
  const queryString = `
    SELECT *
    FROM listings
    WHERE id = $1;
  `;

  pool.query(queryString, listingID)
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
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const loadUsersListings = (userID) => {
  const queryString = `
    SELECT *
    FROM listings
    JOIN users ON listings.user_id = users.id
    WHERE id = $1;
  `;

  pool.query(queryString, userID)
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

const setListingSold = (id) => {
  const queryString = `
  UPDATE listings
  SET listings.sold = true
  WHERE listings.id = $1
  `;

  return pool
    .query(queryString, id)
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
  getListings,
  displayListings,
  loadFeaturedListings,
  loadFilteredPosts,
  loadListingID,
  loadUsersListings,
  setListingSold
};
