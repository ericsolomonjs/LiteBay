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

Users can:
1. users can see featured items on a main feed
  - SELECT * FROM listings WHERE featured
2. users can filter items by price,
  - SELECT * FROM listings WHERE PRICE < 20 ORDER BY date_added;
3. users can favourite items to check up on them later
  ALTER TABLE (change featured)
4. users can send messages to the user that is listing the item

- - Message about specific listing (TBA) 

**** CLARIFY REQUIREMENTS FOR ADMIN****

Admin(seller) can:
1. post items, which can be seen by others
  - ADD 
2. remove items from the site
  - DELETE
3. mark items as SOLD!,
  - ALTER
4. send a message via app, email, or text back on negotiations in buying the said item 
  - ADD

# Database Tables

1. Users
2. Images
3. Listings
4. Favourites
5. Messages

# Routes

1. GET '/' - Display Featured listings

2. GET '/filter=:filterVariable'
  - Res.render(index.html)
  - LoadFilteredListings(filterVariable)

3. GET '/users/:id'
  - DisplayUserInfo(); //display urls tinyapp
  - DisplayMessages(); //display urls tinyapp
  - DisplayFavorites(); //display urls tinyapp

4. GET '/admin/:id'
  - Check if id is admin
  - if not redirect to login

5. POST '/'
  - addListing();

6. POST '/setsold/'
  - //placeholder
  - setListingSold();

7. POST '/delete/:listingId'
  - deleteListing();

## TASKS
C = COMPLETED

Ryan
1. C / HEADER (litebay)
2. addListing(); //node postGRES
3. setListingSold(); //node postGRES
4. deleteListing(); //node postGRES

Eric
1. HTML HOMEPAGE (TO BE STYLED) // used existing, will amend as we go
2. GetUserInfo()
3. DisplayUserInfo(); //display urls tinyapp
4. GetMessages(username);
5. DisplayMessages(); //display urls tinyapp
6. GetFavorites()

Sid
1. C / CREATE DB schema buysell_midterm_db
2. C / LoadFilteredListings(filterVariable) //node postGRES
3. C / LoadFeaturedListings
4. C / LoadUserListings (all listings by a user)
5. C / LoadListingID (gets info for specific listing)

6. DisplayListings(listingsObject {id: value}); //re use everywhere

## GIT NOTES
1. *IMPORTANT* "git pull" BEFORE ANY WORK
2. git checkout -b feature/INSERT BRANCH NAME
# YOUR WORK
3. git add (SPECIFIC FILES/FOLDERS)
4. git commit -m "(INSERT SHORT DESCRIPTION)"
5. git checkout master
6. git pull
7. git checkout feature/(INSERT BRANCH NAME)
8. git merge master
# MAKE SURE NOTHING IS BROKEN
9. git checkout master
10. git merge feature/(INSERT BRANCH NAME)
11. git push
