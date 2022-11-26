const db = require('../../db/connection');

// function adds a user to the database
const addUser = (user) => {
  const queryString = `
  INSERT INTO users (username, email, hashed_password, full_name)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;
  const values = [
    user.username,
    user.email,
    user.hashedPassword,
    user.fullName,
  ];

  return db.query(queryString, values)
    .then((userObject) => {
      return userObject.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

// admin authenticator
const getIsAdmin = (id) => {
  const queryString = `
    SELECT is_admin
    FROM users
    WHERE id = $1;
  `;

  return db.query(queryString, [id])
    .then((adminStatus) => {
      return adminStatus.rows[0].is_admin;
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

// no longer required after project requirements were explained
const setAdmin = (username) => {
  const queryString = `
    UPDATE users
    SET is_admin = true
    WHERE users.username = $1
    RETURNING *;
  `;

  return db.query(queryString, [username])
    .then((userObject) => {
      return userObject.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserIDWithEmail = (email) => {
  const queryString = `
    SELECT id
    FROM users
    WHERE email = $1;
  `;

  return db.query(queryString, [email])
    .then((userObject) => {
      return userObject.rows[0].id;
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const getUserIDWithUsername = (username) => {
  const queryString = `
    SELECT id
    FROM users
    WHERE username = $1;
  `;

  return db.query(queryString, [username])
    .then((userObject) => {
      return userObject.rows[0].id;
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const getUserObjectWithUsername = (username) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE username = $1;
  `;

  return db.query(queryString, [username])
    .then((userObject) => {
      return userObject.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const getUserObjectWithEmail = (email) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;

  return db.query(queryString, [email])
    .then((userObject) => {
      return userObject.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const getUserObjectWithID = (id) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1
  `;

  return db.query(queryString, [id])
    .then((userObject) => {
      return userObject.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const checkFavourite = (userID, listingID) => {
  const queryString = `
    SELECT favourites.id
    FROM favourites
    JOIN listings ON listings.id = favourites.listing_id
    JOIN users ON users.id = favourites.user_id
    WHERE favourites.user_id = $1 AND favourites.listing_id = $2;
  `;
  const values = [userID, listingID];

  return db.query(queryString, values)
    .then((favouriteObject) => {
      return favouriteObject.rows[0];

    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const setFavourite = (userID, listingID) => {
  const queryString = `
    INSERT INTO favourites (user_id, listing_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [userID, listingID];

  return db.query(queryString, values)
    .then((favouriteObject) => {
      return favouriteObject.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

// not within project scope, but will use it when adding more functionality
const removeFavourite = (userID, listingID) => {
  const queryString = `
    DELETE FROM favourites (user_id, listing_id)
    WHERE user_id = $1 AND listing_id = $2
    RETURNING *;
  `;
  const values = [userID, listingID];

  return db.query(queryString, values)
    .then((favouriteObject) => {
      return favouriteObject.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getFavourites = (id) => {
  const queryString = `
    SELECT users.username, users.email, listings.listing_title, listings.text, listings.price, listings.date_added, listings.sold, images.url, images.alt_text, favourites.id as favourite_id
    FROM favourites
    JOIN users ON favourites.user_id = users.id
    JOIN listings ON favourites.listing_id = listings.id
    JOIN images ON listings.image_id = images.id
    WHERE favourites.user_id = $1;
  `;

  db.query(queryString, [id])
    .then((favouriteListingsObject) => {
      return favouriteListingsObject.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

module.exports = {
  addUser,
  getIsAdmin,
  setAdmin,
  getUserIDWithEmail,
  getUserIDWithUsername,
  getUserObjectWithEmail,
  getUserObjectWithUsername,
  getUserObjectWithID,
  checkFavourite,
  setFavourite,
  removeFavourite,
  getFavourites
};
