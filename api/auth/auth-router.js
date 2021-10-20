const bcrypt = require('bcryptjs');
const router = require('express').Router();

const {ROUNDS} = require('../secrets');
const Users = require('./auth-model');
const {
  checkCredentials,
  checkUsername,
  checkPayload,
  checkUser,
  verifyToken
} = require('./auth-middleware');
const buildToken = require('./token-builder');
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

router.post(
  '/login',
  checkCredentials,
  checkPayload,
  checkUser,
  (req, res, next) => {
    const {username, password} = req.body;
    if (bcrypt.compareSync(password, req.user.password)) {
      const token = buildToken(req.user);
      res.status(200).json({
        message: `welcome, ${req.user.username}!`,
        token
      });
    } else {
      next({status: 401, message: 'invalid credentials'});
    }
});

router.put(
  '/',
  checkCredentials, 
  checkUsername,
  checkPayload,
  verifyToken,
  (req, res, next) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, ROUNDS);
    const id = req.token.user_id;
    user.password = hash;
    const update = Users.update(user, id);
    res.status(200).json({message: 'working'});
});

module.exports = router;