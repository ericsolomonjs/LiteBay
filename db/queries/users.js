const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getThisUserById = (userID) => {
  return db.query(`SELECT username, email, hashed_password, full_name, is_admin FROM users WHERE id = ${userID};`)
    .then(data => {
      return data.rows;
    });
}

module.exports = { getUsers,
  getThisUserById };
