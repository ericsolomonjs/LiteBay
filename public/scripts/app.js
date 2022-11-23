//   getUserInfo,
//   getUserListings,
//   getUserInfo,
//   displayUserInfo,
//   getFavorites

const { buildAdminPage } = require("../../bin/helpers/pageBuilderHelper");


// Client facing scripts here
$(document).ready(() => {
  //on document ready load all the listings user etc
  const filename = (document.URL.split('/').pop() ? document.URL.split('/').pop() : "local") ;
  console.log('filename = ', filename );
  //populate homepage with assets
  if (filename === "local") {
    buildHomePage();
    
    // const featuredListings = getFeaturedListings();
    // const listings = getListings();

    // //loop through and display each featured listing
    // for (let listing in featuredListings) {
    //   $('div.featured-section').prepend(displayListings(listing));
    // }

    // //loop through and display each listing
    // for (let listing in listings) {
    //   $('div.listings-section').prepend(displayListings(listing));
    // }
  }

  //populate user page with assets
  if (filename === "user") {
    buildUserPage();
    
    // const favoriteListings = getFavoriteListings();
    // const userInfo = getUserInfo();
    // displayUserInfo(userInfo);

    // //loop through and display each favorited listing
    // for (let listing in favoriteListings) {
    //   $('div.featured-section').prepend(displayListings(listing));
    // }
  }

  if (filename === "admin") {
    buildAdminPage();
    //do admin stuff
  }
  
});