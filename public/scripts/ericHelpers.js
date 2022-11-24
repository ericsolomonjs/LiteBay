const loadHomeListings = () => {

  $.get("/api/listings/featured/", (listings) => {})
  .done((listings) => {
    renderListings(listings, ".featured-listings-section");
  }) 
  
  $.get("/api/listings/notfeatured/", (listings) => {})
  .done((listings) => {
    renderListings(listings, ".listings-section");
  }) 
}

const loadFavouriteListings = () => {
  $.get("/api/listings/favourite-listings/", (listings) => {})
  .done((listings) => {
    renderListings(listings, ".favorite-listings-area");
  }) 
}

const renderListings = (listings, target) => {
  for (let listing in listings["listings"]) {
    $(target).append(`
    <article class=listing-article>
          <div>
            <!-- BUTTON POSTS TO FAVORITES DB OR IF EXISTS, DELETES FROM -->
            <button type=submit buttonmethod="POST" buttonaction="/favorite/:post_id">
              FAVORITE
            </button>
          </div>
          <div>
            <!-- TARGET THE CLASS BELOW FOR LISTING TEXT! -->
            <p class=listing-text>
              ${listing.text}
            </p>
            <!-- TARGET THE CLASS BELOW FOR LISTING IMAGE! -->
            <img class="listing-img"
              src="https://cdn.shopify.com/s/files/1/0622/0660/7617/t/3/assets/1-1654814628780.jpg?v=1654814629"
              alt="Picture of a motorcycle" width="200px">
          </div>
          <div>
            <!-- TARGET THE CLASS BELOW FOR USER -->
            <p class="posted-by">
              Posted by : USER
            </p>
            <!-- TARGET THE CLASS BELOW WITH POSTED x [unit of time] AGO -->
            <p class="posted-time">
              Posted 7 days ago
            </p>
          </div>
        </article>
    
    ${listing.username}   ${listing.text} etc etc
    `)
  }
}


