// Client facing scripts here

$(document).ready(() => {
  //on document ready load all the listings user etc
  const filename = (document.URL.split('/').pop() ? document.URL.split('/').pop() : "local") ;
  console.log('filename = ', filename );
  //populate homepage with assets
  if (filename === "local") {
    console.log("before buildhomepage,inside condition");
    loadFeaturedListings();
    loadUnfeaturedListings();
    
  }

  //populate user page with assets
  if (filename === "user") {
    buildUserPage();
    
    // const favouriteListings = getFavouriteListings();
    // const userInfo = getUserInfo();
    // displayUserInfo(userInfo);

    // //loop through and display each favourited listing
    // for (let listing in favouriteListings) {
    //   $('div.featured-section').prepend(displayListings(listing));
    // }
  }

  if (filename === "admin") {
    buildAdminPage();
    //do admin stuff
  }
  
});