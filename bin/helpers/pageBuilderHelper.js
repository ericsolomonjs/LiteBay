function buildHomePage() {
  const homeHtml = `
  <%- include('partials/_home.ejs') %>
  `;
  $("div.load-page-section").append(homeHtml);
}

function buildAdminPage() {
  const homeHtml = `
  <%- include('partials/_admin.ejs') %>
  `;
  $("div.load-page-section").append(homeHtml);
}

function buildCreateListingPage() {
  const homeHtml = `
  <%- include('partials/_createListing.ejs') %>
  `;
  $("div.load-page-section").append(homeHtml);
}

function buildLoginPage() {
  const homeHtml = `
  <%- include('partials/_loginRegister.ejs') %>
  `;
  $("div.load-page-section").append(homeHtml);
}

module.exports = {
  buildHomePage,
  buildAdminPage,
  buildCreateListingPage,
  buildLoginPage
}