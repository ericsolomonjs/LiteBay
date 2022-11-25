const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['fdj3i42o2k3ggdger644212'],
  maxAge: 24 * 60 * 60 * 1000
}));

const {
  addUser,
  getUserIDWithEmail,
  getUserIDWithUsername
} = require('../bin/helpers/userHelpers');

// user submits data for registration, account is created
router.post('/', (req, res) => {
  const fullName = req.body.fullName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // if either text field is empty, return error message
  if (!fullName || !username || !email || !password) {
    return res.status(400).send('<p>A text field was left blank.</p>');
  }

  // if username or email exists in database, return error message
  getUserIDWithEmail(email)
    .then((result) => {
      if (result) {
        return res.status(400).send('<p>Account with that email/username already exists.</p>');
      }

      getUserIDWithUsername(username)
        .then((result) => {
          if (result) {
            return res.status(400).send('<p>Account with that email/username already exists.</p>');
          }

          // takes in user object and inserts into db
          addUser({
            username,
            email,
            hashedPassword: bcrypt.hashSync(password, 10),
            fullName
          })
            .then((newUser) => {
              return res.redirect('/login');
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

module.exports = router;
