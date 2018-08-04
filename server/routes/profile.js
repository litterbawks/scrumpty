const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('routing to profile');
  controller.addBlocker(req.body, req.user) //update
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

module.exports = router;
