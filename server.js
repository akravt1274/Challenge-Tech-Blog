// import dependencies
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// const helpers = require('./utils/helpers');
const session = require('express-session');
// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// import database connection
const sequelize = require('./config/connection');

// import routes
const routes = require('./routes');

// set up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    }
  }
});

// register session
app.use(session({
  secret: 'somesecret',
  cookie: {
    maxAge: 3000000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
      db: sequelize,
    }),
}));

// configure Handlebars
app.set('view engine', 'handlebars');                               // set Handlebars as the default view engine
app.set('views', path.join(__dirname, 'views'));                    // directory where Handlebars templates are located
app.engine('handlebars', hbs.engine);   // register Handlebars as the template engine

// configure json parsing midleware functions to handle POST requests (<form> data) - should be placed above routes
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// serve static content from the /public folder
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static('images'));

// use the routes defined in the ./routes folder for handling incoming requests
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  console.log('All models were synchronized successfully.');
  // turn on the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
