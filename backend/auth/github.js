const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = mongodb.getDb().db();
        const usersCollection = db.collection('users');

        // find user by githubId
        let user = await usersCollection.findOne({ githubId: profile.id });

        // if not found → create
        if (!user) {
          const newUser = {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            createdAt: new Date()
          };

          const result = await usersCollection.insertOne(newUser);
          user = { ...newUser, _id: result.insertedId };
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// store user id in session
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// retrieve user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await mongodb
      .getDb()
      .db()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
