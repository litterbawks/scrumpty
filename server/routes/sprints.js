const express = require('express');
const controller = require('../controller');

const router = express.Router();


router.post('/', (req, res) => {
  console.log('adding sprint');
  const title = req.body.title;
  const repo = req.body.repo;
  const owner_id = req.user.id;
  const username = req.user.username;
  controller.addSprint(title, owner_id, username, repo)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.get('/', (req, res) => {
  if (req.user) {
    console.log('fetching sprints a user has access to');
    const user_id = req.user.id;
    controller.getSprints({ user_id })
      .then((result) => { console.log('success', result); return res.send(result); })
      .catch((err) => { console.log(err); return res.send(false); });
  }
});


router.get('/isOwner', (req, res) => {
  console.log('is this user the owner of a sprint');
  const owner_id = req.user.id;
  const { sprint_id } = req.query;
  console.log({ owner_id, sprint_id });
  controller
    .isOwner({ owner_id, sprint_id })
    .then((result) => {
      console.log('success', result);
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.send(false);
    });
});


// used to add a user to a sprint
router.put('/addUser', (req, res) => {
  console.log('adding user to sprint');
  // check that user is allowed to add people to the sprint
  const owner_id = req.user.id;
  const { username, sprint_id } = req.body;

  controller.addUserToSprint({ owner_id, username, sprint_id })
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

// used to add a user to a sprint
router.put('/removeUser', (req, res) => {
  console.log('removing user from sprint');
  // check that user is allowed to add people to the sprint
  const owner_id = req.user.id;
  const { user_id, sprint_id } = req.body;

  controller.removeUserFromSprint({ owner_id, user_id, sprint_id })
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});
module.exports = router;
