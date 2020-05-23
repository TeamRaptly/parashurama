const { getEnabledFeatures } = require('../middlewares/features');

module.exports.allPropsHelper = function (req, res, next) {
  res.locals.csrfToken =
    typeof req.csrfToken === 'function' ? req.csrfToken() : '';

  res.locals.props.app = {
    csrfToken: res.locals.csrfToken,
    currentUrl: req.originalUrl,
    currentLanguage: res.locals.language
  };

  res.locals.props.helpers = {
    config: res.locals.config,
    featuresDefinitions: getEnabledFeatures(),
    features: req.features,
    translations: res.locals.translations,
    language: res.locals.language
  };

  next();
};
