// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");

// UPDATE WITH CORRECT FUNCTIONS import helper fx from single file
const {
  generateRandomString,
  getUserByEmail,
  getUserByUserId,
  urlsForUser
} = require("./helpers");
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



//update all routes below

// renders login page
app.get("/login", (req, res) => {
  const loggedIn = getUserByUserId(req.session.user_id, users); // UPDATE WITH CORRECT HELPER FX

  // if logged in, redirect to "my urls"
  if (loggedIn) {
    return res.redirect("/urls"); // UPDATE WITH CORRECT ROUTE
  }
  return res.render("login_register");
});

// user enters information and logs in
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const authorizedUser = getUserByEmail(users, email); // UPDATE WITH CORRECT HELPER FX

  if (!authorizedUser) {
    return res.status(403).send("<p>User with that e-mail cannot be found.</p>");
  }

  // if password does not match with stored value, return error message
  if (!bcrypt.compareSync(password, authorizedUser.password)) {
    return res.status(403).send("<p>Password does not match.</p>");
  } else {
    req.session.user_id = authorizedUser.id;
    return res.redirect("/urls"); // UPDATE WITH CORRECT ROUTE
  }
});

// logs user out, clears session cookies, redirect to login page
app.post("/logout", (req, res) => {
  req.session = undefined;
  return res.redirect("/login");
});


// renders user registration page
app.get("/register", (req, res) => {
  const userID = req.session.user_id;
  const loggedIn = getUserByUserId(userID, users); // UPDATE WITH CORRECT HELPER FX

  if (loggedIn) {
    return res.redirect("/urls");
  }

  return res.render("urls_register");
});

// user submits data for registration, account is created
app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // if either text field is empty, return error message
  if (!username || !email || !password) {
    return res.status(400).send("<p>A text field was left blank.</p>");
  }

  // if email exists in database, return error message
  if (getUserByEmail(users, email)) {  // UPDATE WITH CORRECT HELPER FX
    return res.status(400).send("<p>Email is already in use.</p>");
  }

  const newUserId = generateRandomString(); // UPDATE WITH CORRECT HELPER FX
  users[newUserId] = {
    id:  newUserId,
    email,
    password: bcrypt.hashSync(password, 10)
  };
  req.session.user_id = newUserId;

  return res.redirect("/urls");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
