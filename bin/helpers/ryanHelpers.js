// Helper function to be added to listingHelpers.js later

const getIsAdmin = (id) => {
  const queryString = `
    SELECT is_admin
    FROM users
    WHERE username = $1;  
  `;

  const values = [id];

  pool.query(queryString, values)
    .then((result) => {
      data = result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    })

  return data;
}