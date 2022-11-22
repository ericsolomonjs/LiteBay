const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant', // may need to change
  password: '123',
  host: 'localhost',
  database: 'test_db' // change to project db name
});

//- DisplayUserInfo(); //display urls tinyapp
//- DisplayMessages(); //display urls tinyapp
//- DisplayFavorites(); //display urls tinyapp

function getUserInfo(username) {
  let {email,full_name, id, is_Admin} = '';
  pool.query(`SELECT username,email,full_name, id, is_admin FROM users WHERE username='${username}'`, (err, res) => {
    if (err) {console.log(err);}
    id = res.id;
    is_Admin = res.is_Admin;
    email = res.email;
    full_name = res.full_name;
  })
  return {id, is_Admin, email, full_name};
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

    listingsArray = res; //check if possible to use array for id's
  })  
  return listings;
}

function getUserInfo (username){
  const query = `SELECT * FROM users WHERE username = $1`;
  const values = [username];
  let data;

  pool.query(query, values)
  .then ((res, error) => {
    if (error) {console.log("ERROR: ", error);}
    data = res;
    console.log(res);


  })

}

function displayUserInfo(infoObject) {

}

function getFavorites(username) {
  let favorites = null;
  const query =`SELECT listings_id FROM favorites JOIN users ON favorites.user_id=users.id WHERE username='$1'`
  let values = [username];
  pool.query(query,values)
  then((req, res) => {
    favorites = res.listings.id;
  })
  return favorites;
}

function displayListings(favoritesObject){
  
}

//commented out messages for now
// function getMessages(username) {
//   //get the messages for a user from username (join tables)
//   let {receivedMessages, sentMessages} = null;
//   pool.query(`SELECT messages.id FROM messages JOIN users ON messages.sent_to = users.id WHERE username = ${username}`, (req, res) => {
//     receivedMessages = res.id;
//   });
//   pool.query(`SELECT messages.id FROM messages JOIN users ON messages.sent_from = users.id WHERE username = ${username}`, (req, res) => {
//     sentMessages = res.id;
//   });
//   //return messages object  
//   return {receivedMessages, sentMessages};

// }

// function displayMessages(messagesObject) {
  
// }