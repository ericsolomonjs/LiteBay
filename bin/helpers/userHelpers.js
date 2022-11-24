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
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// DETERMINE USER ADMIN STATUS
const getIsAdmin = (id) => {
  const queryString = `
    SELECT is_admin
    FROM users
    WHERE username = $1;  
  `;

  const values = [id];

  pool.query(queryString, values)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    })

  return data;
}

// GET USER ID FUNCTIONS
const getUserIDWithEmail = (email) => {
  const queryString = `
    SELECT id
    FROM users
    WHERE email = $1;
  `;
  let data = null;

  pool.query(queryString, email)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return data;
};


const getUserIDWithUsername = (username) => {
  const queryString = `
    SELECT id
    FROM users
    WHERE username = $1;
  `;
  let data = null;

  pool.query(queryString, username)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return data;
};

// GET USER OBJECT FUNCTIONS
const getUserObjectWithUsername = (username) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE username = $1;
  `;
  let data = null;

  pool.query(queryString, username)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return data;
};

const getUserObjectWithEmail = (email) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;
  let data = null;

  pool.query(queryString, email)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return data;
};

const getUserObjectWithID = (id) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE ID = $1
  `;
  let data = null;

  pool.query(queryString, id)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return data;
};

const displayUserInfo = (infoObject) => {
  //add user data to page HTML
  $("div.user-info-section").prepend(`
  ${infoObject.username},
  ${infoObject.email}`);
};

const getFavorites = (username) => {
  let favorites = null;
  const queryString = `SELECT * FROM favorites
  JOIN users ON favorites.user_id=users.id
  JOIN listings ON listings.id = listings_id
  WHERE username='$1'`;

  pool.query(queryString, username)
    .then((req, res) => {
      //has to return object of listings that are user favorites so currently wrong
      favorites = res.rows;
    });
  return favorites;
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
  getFavorites
};
