# A dynamic, interactive web interface via vanila JS, bootstrap

## It provides different functionality for two roles: Users and Admins. By default there are 3 admins and 12 users

Each user has visualID, personalname, familyname, username, email attributes.

# ***Log in via username(case insenstive) and email(case sensitive)***
Admin login example: 
Username: user2
Email: admin

User login example:
Username: user5
Email: 5@5.ca

Fail to log in will keep previous info and error after reopening modal
### Admin Privilege

- Able to view entire collection of both users and admins
- Able to delete specific user from the collection

### User are only able to view their information and three admins’ Personal name (no username and email visible of admins)

# Admin:

1. Login through login button in the first section
2. a ‘cards’ button will pop up for you to jump to beginning of cards collection anytime
3. a ‘edit’ button will pop up at the right for you to delete users
4. By clicking on ‘edit’ you’ll be able to get into a offcanvas on the left 
5. Click on ‘deleting user’ button to browse list of available users ( unable to delete admins) and delete it
6. EX. click on ‘user3’ will immediately delete user3 and update the cards collection

# Users:

1. Login through login button
2. a ‘cards’ button will pop up for you to jump to beginning of cards collection anytime
3. User are only able to view their information and three admins’ Personal name, family name
4. Future functions for users undecided

# Sign out:

Click on sign out button to sign out (amazing)

Cards and unused button will disappear