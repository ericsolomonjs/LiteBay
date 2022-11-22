const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

function getListings(username) {
  const user = new User(); // what is User(), still needed?

  let listings = null;
  const queryString = `
    SELECT *
    FROM listings
    FULL JOIN users ON listings.user_id=users.id
    WHERE users.username LIKE $1
  `;
  const values = [`${username}`];

  pool.query(queryString, values)
    .then(res => {
      res.rows.forEach(listing => {
        listings += res.listings.id; // what is "res.listings.id", just id or whole object?
      });
    }).catch(err => console.error('query error', err.stack));

  return listings;
}

function displayListings(favoritesObject) {
  const $tweet = `
    <article class="listing-article">
    <div>
      <button type="submit" buttonmethod="POST" buttonaction="/favorite/:post_id">
        FAVORITE
      </button>
    </div>
    <div>
      <p class="listing-text">${favoritesObject.text}</p>
      <img class="listing-img" src=${favoritesObject.image_id} alt="COME BACK TO THIS LATER">
    </div>
    <div>
      <p class="posted-by">
        Posted by : ${favoritesObject.username}
      </p>
      <p class="posted-time">
        ${favoritesObject.date_added}
      </p>
    </div>
  </article>
    `;

  return $tweet;
};

//module.exports?
