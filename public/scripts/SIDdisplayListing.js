
function getListings(username) {
  const user = new User();
  let favorites = null;
  user.query(`SELECT listings_id FROM favorites JOIN users ON favorites.user_id=users.id WHERE username='${username}'`,(req, res) => {
    favorites = res.listings.id;
  })
  return favorites;
}


function displayListings(favoritesObject){

    const $tweet = `
      <article class="tweet">
        <header class="username">
          <div class="pic-username">
            <img class="profile-pic" src=${tweetData.user.avatars}>
            <p>${tweetData.user.name}</p>
          </div>
          <p class="userhandle">${tweetData.user.handle}</p>
        </header>
        <div class="posted-tweet">
          <p>${escape(tweetData.content.text)}</p>
        </div>
        <footer class="metadata">
          <p>${timeago.format(tweetData.created_at)
      }</p>
          <div class="retweet-icons">
            <i class="fa-solid fa-flag icon"></i>
            <i class="fa-solid fa-retweet icon"></i>
            <i class="fa-solid fa-heart icon"></i>
          </div>
        </footer>
      </article>
    `;

    return $tweet;
  };
  // take listings
  // output html `
}
