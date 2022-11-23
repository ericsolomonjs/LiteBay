const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

function getUserInfo(username) {
  const query = `SELECT * FROM users WHERE username='$1'`;
  let data;
  pool.query(query, username, (err, res) => {
    if (err) {console.log(err);}
    data = res.rows
  })
  return data;
}

function getUserListings(username) {
  //get the listings for a user from username (JOIN TABLES)
  let listings = {};
  let listingsArray = [];
  const value = [username]
  const query = [`SELECT * FROM listings JOIN users ON listings.user_id = users.id WHERE username='$1'`]
  //get matching listings by username
  pool.query(query, value, (err, res) => {
    if (err) {
    console.log(err);
    return;
    }
    listingsArray = res.rows; //check if possible to use array for id's
  })  
  return listings;
}

function getUserInfo (username){
  const query = `SELECT * FROM users WHERE username = $1`;
  const values = [username];
  let data = null;
  pool.query(query, values)
  .then ((err,res) => {
    if (err) {console.log("ERROR: ", err);}
    data = res;
    console.log(res);
  })
  //return queried data
  return data;
}

function displayUserInfo(infoObject) {
  //add user data to page HTML
  $("div.user-info-section").prepend(`
  ${data.username},
  ${data.email}`)
}

function getFavorites(username) {
  let favorites = null;
  const query =`SELECT * FROM favorites 
  JOIN users ON favorites.user_id=users.id 
  JOIN listings ON listings.id = listings_id
  WHERE username='$1'`
  let values = [username];
  pool.query(query,values)
  then((req, res) => {
    //has to return object of listings that are user favorites so currently wrong
    favorites = res.rows;
  })
  return favorites;
}

const addUser = function (user) {
  const values = [
    user.username,
    user.email,
    user.hashed_password,
    user.full_name,
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
}


module.exports = {
  addUser,
  displayUserInfo,
  getFavorites,
  getUserInfo,
  getUserListings,
  getUserInfo,
}