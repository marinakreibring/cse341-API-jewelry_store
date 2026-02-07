require('dotenv').config();
require('./auth/github');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');


const mongodb = require('./db/connect');

require('./auth/github');

const port = process.env.PORT || 8081;
const app = express();

app
  .use(bodyParser.json())
  .use(cors())
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) console.log(err);
  else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
