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
    id = res.id
    is_Admin = res.is_Admin
    email = res.email;
    full_name = res.full_name;
  })
  return {id, is_Admin, email, full_name};
}

function getUserListings(username) {
  //get the listings for a user from username (JOIN TABLES)
  let listings = {};
  let listingsArray = [];
  //get matching listings by username
  pool.query(`SELECT id FROM listings JOIN users ON listings.user_id = users.id WHERE username='${username}'`, (req, res) => {
    listingsArray = res.id; //check if possible to use array for id's
  })
  //get values for each listing
  for (let listing in listingsArray) {
    pool.query(`SELECT * FROM listings WHERE id='${listing}'`, (req, res) => {
      listings[res.id] = {
        image: res.image,
        text: res.text,
        price: res.price,
        featured: res.featured,
        sold: res.sold,
        date_added: res.date_added
      }
    })
  }
  
  return listings;
}

function displayUserInfo(infoObject) {

}

function getMessages(username) {
  //get the messages for a user from username (join tables)
  let {receivedMessages, sentMessages} = null;
  pool.query(`SELECT messages.id FROM messages JOIN users ON messages.sent_to = users.id WHERE username = ${username}`, (req, res) => {
    receivedMessages = res.id;
  });
  pool.query(`SELECT messages.id FROM messages JOIN users ON messages.sent_from = users.id WHERE username = ${username}`, (req, res) => {
    sentMessages = res.id;
  });
  //return messages object  
  return {receivedMessages, sentMessages};

}

function displayMessages(messagesObject) {
  
}

function getFavorites(username) {
  let favorites = null;
  let query
  let values
  pool.query(`SELECT listings_id FROM favorites JOIN users ON favorites.user_id=users.id WHERE username='${username}'`,(req, res) => {
    favorites = res.listings.id;
  })
  return favorites;
}


function displayFavorites(favoritesObject){
  
}