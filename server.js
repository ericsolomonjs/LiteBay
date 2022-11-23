// load .env data into process.env
require('dotenv').config();

// User helper files
const {
  addUser,
  getUserObject,
  getUserID,
  getUserObjectWithID,
  displayUserInfo,
  getFavorites
} = require("bin/helpers/userHelpers.js");

// Listing helper files
const {
  addListing,
  deleteListing,
  getListings,
  displayListingCard,
  loadFeaturedListings,
  loadFilteredPosts,
  loadListingID,
  loadUsersListings,
  setListingSold
} = require("bin/helpers/listingHelpers.js");

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: "session",
  keys: ["fdj3i42o2k3ggdger644212"],
  maxAge: 24 * 60 * 60 * 1000
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//DONE
// "/" home

// get login/register
// post login
// post logout
// post register

//TODO
// add event listener for category (price, date, ascending & descending) filtering

//RYAN
// get create LISTING
// post /create

// get admin page
// post admin page

//ERIC
// get user page
// don't need post user page, eric will do button thing



// renders login page
app.get("/login", (req, res) => {
  const loggedIn = getUserObjectWithID(req.session.user_id); //fix helper

  // if logged in, redirect to "home"
  if (loggedIn) {
    return res.redirect("/");
  }
  return res.render("login_register");
});

// user enters information and logs in
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const authorizedUser = getUserObject(null, email); // clean up helper fx

  if (!authorizedUser) {
    return res.status(403).send("<p>Invalid credentials.</p>");
  }

  // if password does not match with stored value, return error message
  if (!bcrypt.compareSync(password, authorizedUser.password)) {
    return res.status(403).send("<p>Invalid credentials.</p>");
  } else {
    req.session.user_id = authorizedUser.id;
    return res.redirect("/");
  }
});

// logs user out, clears session cookies, redirect to login page
app.post("/logout", (req, res) => {
  req.session = undefined;
  return res.redirect("/");
});

// renders user registration page
app.get("/register", (req, res) => {
  const userID = req.session.user_id;
  const loggedIn = getUserObject(userID); // UPDATE WITH CORRECT HELPER FX

  if (loggedIn) {
    return res.redirect("/");
  }

  return res.render("login_register");
});

// user submits data for registration, account is created
app.post("/register", (req, res) => {
  const fullName = req.body.fullName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // if either text field is empty, return error message
  if (!fullName || !username || !email || !password) {
    return res.status(400).send("<p>A text field was left blank.</p>");
  }

  // if username or email exists in database, return error message
  if (getUserObject({username, email})) {
    return res.status(400).send("<p>Account with username/email already exists.</p>");
  }

  addUser({
    username,
    email,
    hashedPassword: bcrypt.hashSync(password, 10),
    fullName
  }) // takes in user object and inserts into db

  req.session.user_id = getUserID(username);

  return res.redirect("/");
});
