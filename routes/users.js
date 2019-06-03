var express = require('express');
var router = express.Router();
const UserModel = require('../models/user');

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  new UserModel({
    ...req.body
  }).save()
  .then(user => res.status(201).send(user))
  .catch(cosole.log);
  UserModel.find({}).then(console.log);
});

module.exports = router;
