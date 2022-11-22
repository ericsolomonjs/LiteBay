const deleteListing = function(id) {
  const queryString = `
  DELETE FROM listings
  WHERE listing.id = $1
  `;

  const values = [`${id}`];

  return pool
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.log(error.message);
  });
}

exports.deleteListing = deleteListing;
