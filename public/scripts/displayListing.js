const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

function getListings(username) {
  let listings = null;

  // consider selecting specific items instead of *, for efficiency purposes
  const queryString = `
    SELECT *
    FROM listings
    FULL JOIN users ON listings.user_id = users.id
    FULL JOIN images ON listings.image_id = images.id
    FULL JOIN favourite ON favourite.user_id =
    WHERE users.username LIKE $1
  `;
  const values = [`${username}`];

  pool.query(queryString, values)
    .then(res => {
      res.rows.forEach(() => {
        listings += res.listing.id; // what is "res.listings.id", just id or whole object? there is probably an error with this line.
      });
    }).catch(err => console.error('query error', err.stack));

  return listings;
}

function displayListings(favoritesObject) {
  const $tweet = `
    <article class="listing-article">
    <div>
      <img class="listing-img" src=${favoritesObject.image_id} alt=${favoritesObject.alt_text}>
      <p class="sold">
        Sold!
      <p>
    </div>
    <div>
      <p class="listing-title">${favoritesObject.listing_title}</p>
      <p class="listing-price">${favoritesObject.price}</p>
      <p class="posted-by-user">
        User: ${favoritesObject.username}
      </p>
      <p class="posted-date">
        ${favoritesObject.date_added}
      </p>
      <button class="favourite-button" type="submit" buttonmethod="POST" buttonaction="/favorite/:post_id">
        <% if(${favoritesObject.favourite}){ %>
          <i class="fa-solid fa-bookmark"></i>
        <% } else { %>
          <i class="fa-regular fa-bookmark"></i>
        <% }%>
      </button>
    </div>
    <div>
      <p class="listing-text">${favoritesObject.text}</p>
      <a href="mailto:${favoritesObject.email}">Email Us</a>
    </div>
  </article>
    `;

  return $tweet;
};

//module.exports?



// FEATURED text, decided to do featured section box on homepage instead
//
// <p class="features">
//   <% if(${favoritesObject.featured}){ %>
//     <i>FAVORITE ICON</i> // COME BACK AND FIX THIS**
//   <% } else { %>
//     <i>Not FAVORITE ICON</i>
//   <% }%>
// </p>
