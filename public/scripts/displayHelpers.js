const { User } = require('pg')

//- DisplayUserInfo(); //display urls tinyapp
//- DisplayMessages(); //display urls tinyapp
//- DisplayFavorites(); //display urls tinyapp

function getUserInfo(username) {
  const user = new User();
  let {email,full_name, id, is_Admin} = '';
  user.query(`SELECT username,email,full_name, id, is_admin FROM users WHERE username='${username}'`, (err, res) => {
    if (err) {console.log(err);}
    id = res.id
    is_Admin = res.is_Admin
    email = res.email;
    full_name = res.full_name;
  })
  user.end();
  return {id, is_Admin, email, full_name};
}

function getUserListings(username) {
  //get the listings for a user from username (JOIN TABLES)
  const user = new User();
  let listings = {};
  let listingsArray = [];
  //get matching listings by username
  user.query(`SELECT id FROM listings JOIN users ON listings.user_id = users.id WHERE username='${username}'`, (req, res) => {
    listingsArray = res.id; //check if possible to use array for id's
  })
  //get values for each listing
  for (let listing in listingsArray) {
    user.query(`SELECT * FROM listings WHERE id='${listing}'`, (req, res) => {
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
  user.end();
  return listings;
}

function displayUserInfo(infoObject) {

}

function getMessages(username) {
  //get the messages for a user from username (join tables)
  const user = new User();
  let {receivedMessages, sentMessages} = null;
  user.query(`SELECT messages.id FROM messages JOIN users ON messages.sent_to = users.id WHERE username = ${username}`, (req, res) => {
    receivedMessages = res.id;
  });
  user.query(`SELECT messages.id FROM messages JOIN users ON messages.sent_from = users.id WHERE username = ${username}`, (req, res) => {
    sentMessages = res.id;
  });
  //return messages object  
  user.end();
  return {receivedMessages, sentMessages};

}

function displayMessages(messagesObject) {
  
}

function getFavorites(username) {
  const user = new User();
  let favorites = null;
  user.query(`SELECT listings_id FROM favorites JOIN users ON favorites.user_id=users.id WHERE username='${username}'`,(req, res) => {
    favorites = res.listings.id;
  })
  return favorites;
}


function displayFavorites(favoritesObject){

}