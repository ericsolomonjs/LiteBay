const loadHomeListings = () => {

  $.get("/api/listings/featured/", (listings) => { })
    .done((listings) => {
      renderListings(listings, ".featured-listings-section");
    })

  $.get("/api/listings/notfeatured/", (listings) => { })
    .done((listings) => {
      renderListings(listings, ".listings-section");
    })
}

const loadFavouriteListings = () => {
  $.get("/api/listings/favourites/", (listings) => { })
    .done((listings) => {
      renderListings(listings, ".user-favorites");
    })
}

const loadAdminListings = () => {
  $.get("/api/listings/featured/", (listings) => { })
    .done((listings) => {
      renderListings(listings, ".admin-listings-section");
    })

  $.get("/api/listings/notfeatured/", (listings) => { })
    .done((listings) => {
      renderListings(listings, ".admin-listings-section");
    })
}

const renderListings = (listings, target) => {
  for (let listing of listings["listings"]) {
    const timeSince = Date.now() - listing.date_added;
    const timeString = getTimeString(timeSince);
    $(target).append(`
    <article class=listing-article>
          <div>
            <!-- BUTTON POSTS TO FAVORITES DB OR IF EXISTS, DELETES FROM -->
            <form method="POST" action="/favourite/${listing.id}">
              <button type="submit">Favourite</button>
            </form>
            <img class="listing-img"
              src="${listing.url}"
              alt="${listing.alt_text}" width="70%">
          </div>
          <div>
            <!-- TARGET THE CLASS BELOW FOR LISTING TEXT! -->
            <p>${listing.listing_title} </p>
            <p class=listing-text>
              ${listing.text}
            </p>
            <!-- TARGET THE CLASS BELOW FOR LISTING in IMAGE! -->
            </div>
          <div>
            <!-- TARGET THE CLASS BELOW FOR USER -->
            <p class="posted-by">
              Posted by : ${listing.username}
            </p>
            <!-- TARGET THE CLASS BELOW WITH POSTED x [unit of time] AGO -->
            <p class="posted-time">${timeString}</p>
            <p>$${listing.price}</p>
            </div>
        </article>
    `);
  }
};


///////////////////////////functions for user page load

const loadUserProfile = () => {

  //load user favorites then render
  $.get("/api/user/", (user) => { })
    .done((user) => {
      renderUserProfile(user, ".user-profile");
    })
};

const renderUserProfile = (user, target) => {
  $(target).append(`
    <div>
    <p>User Profile: </p>
    <p class="username">Username : @${user["user"][0].username}</p>
    <p class="fullname">Full name : ${user["user"][0].full_name}</p>
    </div>
  `);
};