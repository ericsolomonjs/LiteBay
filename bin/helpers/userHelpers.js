// const db = require('../../db/connection');
const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// ADD A USER
const addUser = (user) => {
  const values = [
    user.username,
    user.email,
    user.hashedPassword,
    user.fullName,
  ];

  const queryString = `
    INSERT INTO users (username, email, hashed_password, full_name)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

// DETERMINE USER ADMIN STATUS
const getIsAdmin = (id) => {
  const queryString = `
    SELECT is_admin
    FROM users
    WHERE username = $1;
  `;

  return pool.query(queryString, [id])
    .then((result) => {
      return result.rows[0].is_admin;
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    })
}

// GET USER ID FUNCTIONS
const getUserIDWithEmail = (email) => {
  const queryString = `
    SELECT id
    FROM users
    WHERE email = $1;
  `;

  return pool.query(queryString, [email])
    .then((result) => {
      return result.rows[0].id;
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

  return pool.query(queryString, [username])
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

// GET USER OBJECT FUNCTIONS
const getUserObjectWithUsername = (username) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE username = $1;
  `;

  return pool.query(queryString, [username])
    .then((result) => {
      return result.rows[0];
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

  return pool.query(queryString, [email])
    .then((result) => {
      return result.rows[0];
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

  return pool.query(queryString, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
};

const displayUserInfo = (infoObject) => {
  //add user data to page HTML
  $("div.user-info-section").prepend(`
  ${infoObject.username},
  ${infoObject.email}`);
};





//FIX
const getFavourites = (username) => {
  let favourites = null;

  // FIX users.username, users.email to be sellers username and email
  const queryString = `
    SELECT users.username, users.email, listings.listing_title, listings.text, listings.price, listings.date_added, listings.sold, images.url, images.alt_text, favourites.id as favourite_id
    FROM favourites
    JOIN users ON favourites.user_id = users.id
    JOIN listings ON favourites.listing_id = listings.id
    JOIN images ON listings.image_id = images.id
    WHERE username = '$1'
  `;

  pool.query(queryString, [username])
    .then((req, res) => {
      //has to return object of listings that are user favourites so currently wrong
      favourites = res.rows;
    });
  return favourites;
};

module.exports = {
  addUser,
  getIsAdmin,
  getUserIDWithEmail,
  getUserIDWithUsername,
  getUserObjectWithUsername,
  getUserObjectWithEmail,
  getUserObjectWithID,
  displayUserInfo,
  getFavourites
};
