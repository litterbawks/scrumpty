const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const controller = require('./controller');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(
  new Strategy((username, password, done) => {
    controller.getUserByName(username)
      .then((user) => {
        if (!user) {
          return done('User does not exist', null);
        }
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        }
        return done('Invalid Credentials', null);
      })
      .catch(err => console.log(err));
  }),
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.log('id', id);
  if (typeof id !== 'number') {
    controller.getUserByName(id).then(user => {
      if (!user) {
        cb('Err During Deserializaion');
      } else {
        cb(null, user);
      }
    })
  } else {

  controller.getUserById(id).then((user) => {
    if (!user) {
      cb('Err During Deserialization');
    } else {
      cb(null, user);
    }
  });
}
});

const gitHubStrategy = passport => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/users/auth/github/callback"
  },
    function(accessToken, refreshToken, profile, done) {
      console.log('profile photos', profile.photos[0].value)
      const gitHubUserProfile = {
        username: profile.username, 
        password:'placeholder', 
        firstname: profile.displayName, 
        lastname: profile.displayName, 
        preferred: profile.displayName, 
        email: 'placeholder', 
        phonenumber: 'placeholder',
        photo: `${profile.photos[0].value}`
      }
      controller.addUser(gitHubUserProfile);
      done(null, gitHubUserProfile);
  }

  ));

  passport.serializeUser((user, cb) => {
    console.log('serialize user', user);
    cb(null, user.username);
  });
}
module.exports = { passport, gitHubStrategy };
// module.exports = 
