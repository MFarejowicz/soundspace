const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleCredentials } = require('./credentials');

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: googleCredentials.clientId,
  clientSecret: googleCredentials.clientSecret,
  callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
  User.findOne({ 'googleid': profile.id }, function (err, user) {
    if (err) return done(err);
    console.log(`User ${profile.displayName} logged in?`);

    if (!user) {
      const user = new User({
        name: profile.displayName,
        googleid: profile.id
      });

      user.save(function (err) {
        if (err) console.log(err);

        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
