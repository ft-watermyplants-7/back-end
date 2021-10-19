const bcrypt = require('bcryptjs');
const router = require('express').Router();

const {ROUNDS} = require('../secrets');
const Users = require('./auth-model');
const {
  checkCredentials,
  checkUsername,
  checkPayload
} = require('./auth-middleware');
// middleware ./auth-middleware
// secret ../secret
// tokenbuilder ./token-builder

router.post(
  '/register', 
  checkCredentials, 
  checkUsername,
  checkPayload,
  (req, res, next) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, ROUNDS);
    user.password = hash;
    Users.add(user)
      .then(saved_user => {
        res.status(201).json(saved_user);
      })
    .catch(next);
});

module.exports = router;