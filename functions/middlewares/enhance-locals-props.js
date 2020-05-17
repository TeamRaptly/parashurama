module.exports.enhanceLocalsProps = function (req, res, next) {
  res.locals = res.locals || {};
  res.locals.props = res.locals.props || {};

  next();
};
