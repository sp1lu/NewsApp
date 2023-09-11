# RSS Feed Reader
## Description
Simple RSS reader webapp.

Preview at: [newsly-u5hs.onrender.com](https://newsly-u5hs.onrender.com/)
(First loading is slow 'cause of render.com free tier)

## Used technologies
- Node
- MongoDB
- Express
- EJS Templating

## Used libraries
- connect-flash: show flash messages to user in case of errors or succesfull actions
- connect-mongo: set, storage and read session to and from MongoDB
- dotenv: read environment variables
- ejs-mate: templating for frontend
- express: backend framework
- express-session: set session
- helmet: base security and safety functions
- joi: server side data validation
- mongoose: connect backend to MongoDB
- node-sass: compile scss file to css
- passport: handle user authentication, providing username and password salt and hash
- passport-local: handle local authentication with username and password
- passport-local-mongoose: connect passport to MongoDB database
- rss-parser: parse rss feed