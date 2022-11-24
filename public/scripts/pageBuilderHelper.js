//const listingHelpers = require("bin/helpers/listingHelpers.js")

function buildHomePage() {
  let htmlTarget = document.getElementById('load-page-section');
  const html = `<%- include('partials/_home.ejs') %>`;
  
  htmlTarget.innerHTML = html;

  
  // $("div.load-page-section").html(html);
}

function buildAdminPage() {
  const html = `
  <%- include('partials/_admin.ejs') %>
  `;
  $("div.load-page-section").html(html);
}

function buildCreateListingPage() {
  const html = `
  <%- include('partials/_createListing.ejs') %>
  `;
  $("div.load-page-section").html(html);
}

function buildLoginPage() {
  const html = `
  <%- include('partials/_loginRegister.ejs') %>
  `;
  $("div.load-page-section").html(html);
}
