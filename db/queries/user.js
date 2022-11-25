const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getThisUserById = (userID) => {
  return db.query(`SELECT username, email, full_name FROM users WHERE id = ${userID};`)
    .then(data => {
      return data.rows;
    })
    .catch( (error) => {
      console.log('error: ', error)
    })
}

module.exports = { 
  getUsers,
  getThisUserById };
