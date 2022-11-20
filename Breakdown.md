## Mid-term Project
# Team consists of Eric Solomon, Ryan Zhen and Sid Natarajan

- Topic for project: 
Buy/Sell Listing Website

# Pages

- USER PAGE
- Listings Page
- Log in / Register page
- Create listing Page
- Admin Page

# Features

- users can see featured items on a main feed
  - SELECT * FROM listings WHERE featured
- users can filter items by price,
  - SELECT * FROM listings WHERE PRICE < 20 ORDER BY date_added;
- users can favourite items to check up on them later
  ALTER TABLE (change featured)
- users can send messages to the user that is listing the item

- - Message about specific listing (TBA) 

**** CLARIFY REQUIREMENTS FOR ADMIN****

Seller(admin) can:

- post items, which can be seen by others
  - ADD 
- remove items from the site
  - DELETE
- mark items as SOLD!,
  - ALTER
- send a message via app, email, or text back on negotiations in buying the said item 
  - ADD

# Database Tables

- Users

- Messages

- Classifieds

# Routes

GET '/' - Display Featured listings

GET '/filter=:filterVariable'
- Res.render(index.html)
- LoadFilteredListings(filterVariable)

GET '/users/:id'
- DisplayUserInfo(); //display urls tinyapp
- DisplayMessages(); //display urls tinyapp
- DisplayFavorites(); //display urls tinyapp

GET '/admin/:id'

- Check if id is admin
- if not redirect to login

POST '/'

addListing();

POST '/setsold/'
//placeholder
setListingSold();

POST '/delete/:listingId'

deleteListing();

## TASKS

Ryan
- HEADER (litebay)
- addListing(); //node postGRES
- setListingSold(); //node postGRES
- deleteListing(); //node postGRES

Eric
- HTML HOMEPAGE (TO BE STYLED) // used existing, will amend as we go
- DisplayUserInfo(); //display urls tinyapp
- DisplayMessages(); //display urls tinyapp
- DisplayFavorites(); //display urls tinyapp

Sid

- COMPLETED // CREATE DB buysell_midterm_db
- COMPLETED // LoadFilteredListings(filterVariable) //node postGRES
- COMPLETED // LoadFeaturedListings

## GIT NOTES

git pull
git checkout -b feature/INSERT BRANCH NAME

# YOUR WORK

git add SPECIFIC FILES/FOLDERS
git commit -m "INSERT SHORT DESCRIPTION"
git checkout master
git pull
git checkout feature/INSERT BRANCH NAME
git merge master

# MAKE SURE NOTHING IS BROKEN

git checkout master
git merge feature/INSERT BRANCH NAME
git push
