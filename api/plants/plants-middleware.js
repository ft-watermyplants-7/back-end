const db = require('../../data/dbConfig');

const plantSchema = require('./plant-schema');

const checkPayload = async (req, res, next) => {
  req.body.user_id = req.token.user_id;
  try {
    if (
      req.body.nickname && req.body.species && 
      req.body.h2oFrequency 
    ) {

      req.body.nickname = req.body.nickname.trim();
      req.body.species = req.body.species.trim();

      const validated = await plantSchema.validate(req.body);
      req.body = validated;
      next();
    } else {
      next({status: 400, message: 'request does not meet requirements'});
    }
  } catch (err) {
    next({status: 400, message: err.message});
  }
}

module.exports = {
  checkPayload
}