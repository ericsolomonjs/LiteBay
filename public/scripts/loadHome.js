$(document).ready(() => {
  //just calls this for now to load listings
  loadHomeListings();
  $(".filter-20-button").click((event) => {
    event.preventDefault();
    loadFiltered20Listings();
  });
  $(".filter-50-button").click((event) => {
    event.preventDefault();
    loadFiltered50Listings();
  });
})