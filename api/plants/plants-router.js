const router = require('express').Router();

const {verifyToken} = require('../auth/auth-middleware');
const {checkPayload} = require('./plants-middleware');
const Plants = require('./plants-model');

router.post('/', verifyToken, checkPayload, (req, res, next) => {
  Plants.addPlant({...req.body})
    .then(plant => {
      res.status(201).json(plant);
    })
    .catch(next)
});

module.exports = router;