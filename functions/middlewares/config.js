const { config: configuration, publicConfig } = require('../config');

module.exports.config = function (req, res, next) {
  req.config = configuration; // To be used server side
  res.locals.config = publicConfig; // To be used client side
  next();
};
