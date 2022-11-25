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
      renderAdminListings(listings, ".admin-listings-section");
    })

  $.get("/api/listings/notfeatured/", (listings) => { })
    .done((listings) => {
      renderAdminListings(listings, ".admin-listings-section");
    })
}

const renderListings = (listings, target) => {
  for (let listing of listings["listings"]) {
    const timeSince = Date.now() - listing.date_added;
    const timeString = getTimeString(timeSince);
    console.log(listing);
    $(target).append(`
    <article class="listing-article">
        <div>
          <!-- BUTTON POSTS TO FAVORITES DB OR IF EXISTS, DELETES FROM -->
          <button type=submit buttonmethod="POST" buttonaction="/favourite/:post_id">
            FAVOURITE
          </button>
          <img class="listing-img"
            src="${listing.url}"
            alt="${listing.alt_text}" width="70%">
        </div>
        <div>
          <!-- TARGET THE CLASS BELOW FOR LISTING TEXT! -->
          <p class="listing-title">${listing.listing_title} </p>
          <p class="listing-text">
          ${listing.text}
          </p>

          <!-- TARGET THE CLASS BELOW FOR LISTING in IMAGE! -->
          </div>
          <div>
          <!-- TARGET THE CLASS BELOW FOR USER -->
          <p class="posted-by">
            Seller: ${listing.username}
          </p>
          <p class="cost">$${listing.price}</p>
          <!-- TARGET THE CLASS BELOW WITH POSTED x [unit of time] AGO -->
          <p class="posted-time">${timeString}</p>


          </div>
      </article>
    `);
  }
};

const renderAdminListings = (listings, target) => {
  for (let listing of listings["listings"]) {
    const timeSince = Date.now() - listing.date_added;
    const timeString = getTimeString(timeSince);
    $(target).append(`
    <style>
    button {
      width: 150px;
      background-color: #8899FF;
      border: none;
      color: #333333;
      padding: 5px;
      text-align: center;
      cursor: pointer;
      border-radius: 10px;
    }
    </style>
    <br><br><br><br><br>
    <article class="listing-article">
        <div>
          <!-- BUTTON POSTS TO FAVORITES DB OR IF EXISTS, DELETES FROM -->
          <form method="POST" action="/favourite/${listing.id}">
              <button type="submit">Favourite</button>
            </form>
            <form method="POST" action="/admin/${listing.id}/marksold">
            <button type="submit">Mark Sold</button>
            </form>
            <form method="POST" action="/admin/${listing.id}/featured">
            <button type="submit">Feature</button>
            </form>
            <form method="POST" action="/admin/${listing.id}/delete">
              <button type="submit">DELETE!</button>
            </form>
          </div>
          <div>
          <img class="listing-img"
            src="${listing.url}"
            alt="${listing.alt_text}" width="70%">
        </div>
        <div>
          <!-- TARGET THE CLASS BELOW FOR LISTING TEXT! -->
          <p class="listing-title">${listing.listing_title} </p>
          <p class="listing-text">
          ${listing.text}
          </p>

          <!-- TARGET THE CLASS BELOW FOR LISTING in IMAGE! -->
          </div>
          <div>
          <!-- TARGET THE CLASS BELOW FOR USER -->
          <p class="posted-by">
            Seller: ${listing.username}
          </p>
          <p class="cost">$${listing.price}</p>
          <!-- TARGET THE CLASS BELOW WITH POSTED x [unit of time] AGO -->
          <p class="posted-time">${timeString}</p>


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