const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcryptjs');
const controller = require('../controller');

router.post('/', (req, res) => {
  console.log('adding user');
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      controller.addUser({ username: req.body.username, password: hash, firstname: req.body.firstname, lastname: req.body.lastname, preferred: req.body.preferred, email: req.body.email, phonenumber: req.body.phonenumber })
        .then((result) => {
          console.log('success');
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
                return next(err);
              }
              return res.send({ id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname, preferred: user.preferred, email: user.email, phonenumber: user.phonenumber });
            });
          })(req, res);
        })
        .catch((err) => { console.log(err); return res.send(false); });
    });
});

// NOT NEEDED
// router.get('/', (req, res) => {
//   console.log('fetching users');
//   controller
//     .getUsers()
//     .then((result) => {
//       console.log('success');
//       return res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.send(false);
//     });
// });

router.put('/', (req, res, next) => {
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
    // username, password was correct. now update based on newpassword.
    bcrypt.hash(req.body.newpassword, 10)
      .then(hash => controller.updateUser({ username: req.body.username, password: hash }))
      .then(user => res.send({ id: user.id, username: user.username }))
      .catch((err) => {
        console.log(err);
        res.send(false);
      });
  })(req, res, next);
});

router.put('/', (req, res) => {
  console.log('updating user');
  controller.updateUser(req.body)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.get('/sprint', (req, res) => {
// needs AUTH
  console.log('getting all users in sprint', req.query.sprint_id);
  controller
    .getUsersInSprint(req.query.sprint_id, req.user)
    .then((result) => {
      console.log('success');
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.send(false);
    });
});

router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('inside server authentication for github')
    res.redirect('/');
  });

module.exports = router;
