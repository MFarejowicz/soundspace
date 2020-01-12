const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("./models/user");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "http://sound-space.herokuapp.com/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(`User ${profile.username} logged in.`);
      let user = await User.findOne({
        github_username: profile.username
      });
      if (!user) {
        user = new User({
          name: profile.displayName,
          github_id: profile.id,
          github_username: profile.username,
          taps: 0,
          roomsCreated: 0,
          roomsJoined: 0
        });
        user = await user.save();
      }
      done(null, user);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
