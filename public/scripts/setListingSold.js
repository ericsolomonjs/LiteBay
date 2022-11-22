const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// Function sets the status of a listing as sold
const setListingSold = function(id) {
  const queryString = `
  UPDATE listings
  SET listings.sold = true
  WHERE listings.id = $1
  `;
  const values = [`${id}`];

  return pool
  .query(queryString, values)
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.log(error.message);
  });
}

exports.setListingSold = setListingSold;
