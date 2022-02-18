# Consumed Content Server

Consumed content's server is built to run on Vercel's serverless functions.

# Queries

- Add Show
  - Description: User adds show to list
  - Actions: Insert UserShow
- Check User
- Create Review
- Edit Review
- Follow
- Get Categories
- Get Reviews
- Get Show Reviews
- Get Shows
  - Description: Gets 
- Get User Categories
  - Description: Gets categories added by a user.
  - Actions: Ensure user making request is User, or User is public. Get Category from User, join CategoryShow, join Show.
- Get User Reviews
  - Description: Gets reviews added by a user.
  - Actions: Ensure user making request is User, or User is public. Get Reviews from User, join Shows.
- Get User Shows
  - Description: Gets shows added by a user.
  - Actions: Ensure user making request is User, or User is public. Get UserShows from User, join Shows.
- Login
  - Description: Compares password with existing user
  - Actions: Get User by username, compare password, creates token, inserts UserToken. Returns User and UserToken.
- Logout
  - Description: Logs a user out.
  - Actions: Delete UserToken
- Register
  - Description: Registers a user if not already registered.
  - Actions: Checks username doesn't exist, inserts User, creates token, inserts UserToken. Returns User and UserToken.
- Search Movies
  - Description: Gets Movies based on query.
  - Actions: None, API is used.
- Search TV Shows
  - Description: Gets TV shows based on query.
  - Actions: None, API is used.