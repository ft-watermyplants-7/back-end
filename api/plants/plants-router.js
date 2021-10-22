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

router.get('/', verifyToken, (req, res, next) => {
  Plants.getPlants(req.token.user_id)
    .then(plants => {
      res.status(200).json(plants);
    })
    .catch(next);
});

router.put('/:id', verifyToken, checkPayload, (req, res, next) => {

  Plants.update(req.params.id, req.body)
    .then(plant => {
      res.status(200).json({message: 'plant successfuly updated', plant});
    })
    .catch(next);
});

router.delete('/:id', verifyToken, (req, res, next) => {
  Plants.delete(req.params.id)
    .then(deletedPlant => {
      res.status(200).json({message: 'plant was successfully deleted'});
    })
    .catch(next);
})

module.exports = router;