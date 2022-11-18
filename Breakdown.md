## Mid-term Project
# Team consists of Eric Solomon, Ryan Zhen and Sid Natarajan

- Topic for project: 
Buy/Sell Listing Website

# Pages

- USER PAGE
- Listings Page
- Log in / Register page}
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

- Header login


GET '/' - Display Featured listings

GET '/filter=:id' 
- Res.render(index.html)
- LoadFilteredListings()

GET '/users/:id'
- DisplayUserInfo();
- DisplayMessages();
- DisplayFavorites();

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




CREATE TABLE table (
  id SERIAL PRIMARY KEY
)

CREATE TABLE table2 (
  foreign_id SERIAL FOREIGN KEY REFERENCING table.id;
)




## TASKS

Ryan

Eric

Sid

- CREATE DB buysell_midterm_db

## GIT NOTES

GIT PULL before GIT COMMIT

To Merge
Git PULL > GIT MERGE MASTER > 
GIT PULL > GIT COMMIT > GIT PUSH