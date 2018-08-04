const express = require('express');

const router = express.Router();
const passport = require('passport');

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      res.send(false);
      return;
    }
    if (!user) {
      console.log('user login failed');
      return res.send(false);
    }
    req.logIn(user, (err) => {
            if (err) { 
                console.log(err);
                return next(err); }
                console.log('===================================');
                console.log(user);
            return res.send({
              id: user.id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              preferred: user.preferred,
              email: user.email,
              phonenumber: user.phonenumber,
              photo: user.photo
            });
        });
  })(req, res, next);
});

module.exports = router;
