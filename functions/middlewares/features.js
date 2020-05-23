const fs = require('fs');
const path = require('path');

const FEATURE_DEFINITION_FILE = '../config/feature-definitions.json';
const FEATURE_DEFAULT_ENVIRONMENTS = ['local', 'staging'];
const APP_NAME = process.env.HOST_ENV || 'production';

let featureDefinitions;

try {
  const rawFeatures = require(FEATURE_DEFINITION_FILE);

  featureDefinitions = new Map(
    Object.keys(rawFeatures).map((feature) => {
      console.log('feature...', feature);
      return [feature, rawFeatures[feature]];
    })
  );
} catch (e) {
  throw new Error(`Error parsing features file definitions: ${e.message}`);
}

function canUseFeatureFlipping(envVariable, configFlag) {
  return (envVariable && envVariable.toLowerCase() === 'true') || configFlag;
}

function getEnabledFeatures() {
  let enabledFeatures = new Map();

  for (const [featureKey, featureProps] of featureDefinitions) {
    let isFeatureAccessible = true;
    const {
      environments: featureEnvironments = [],
      ...restFeatureProps
    } = featureProps;

    const environments = [
      ...FEATURE_DEFAULT_ENVIRONMENTS,
      ...featureEnvironments
    ];

    if (isFeatureAccessible && environments.includes(APP_NAME)) {
      enabledFeatures.set(featureKey, restFeatureProps);
    }
  }

  return enabledFeatures;
}

function getSettingFromQuery(querySetting) {
  switch (querySetting) {
    case '0':
    case 'false':
    case 'off':
    case false:
      return false;
    default:
      return true;
  }
}

/**
 * A middleware function that is used on every request to turn features on or off.
 *
 * The order of processing is:
 * 1. Any existing features in cookie?
 * 2. Are these overridden by a querystring setting?
 * 3. If none of the above then what does the config resolve to?
 *
 * After this the cookie is updated with the new state and the features are placed
 * on the request for use later. Only features different to what config resolves to
 * are saved in the cookie.
 * @return {Function} a middleware function
 */
const featuresMiddleware = (req, res, next) => {
  const features = {};
  const featureCookies = req.cookies['feature-toggle'] || {};
  const flippedFeatures = [];

  const usingFeatureFlipping = canUseFeatureFlipping(
    process.env.USING_FEATURES, //Can be used to turn off features runtime
    req.config('_usingFeatureFlipping')
  );

  for (const [feature, featureProps] of featureDefinitions) {
    let featureSetting;

    if (usingFeatureFlipping && featureCookies[feature] != null) {
      featureSetting = featureCookies[feature];
    }

    if (usingFeatureFlipping && req.query[featureProps.queryString] != null) {
      featureSetting = getSettingFromQuery(req.query[featureProps.queryString]);
    }

    if (featureSetting == null) {
      featureSetting = req.config(feature);
    }

    if (usingFeatureFlipping && featureSetting !== req.config(feature)) {
      flippedFeatures.push(feature);
    }

    features[feature] = featureSetting;
  }

  if (usingFeatureFlipping) {
    if (flippedFeatures.length > 0) {
      const flippedWithValues = flippedFeatures.reduce((all, current) => {
        all[current] = features[current];

        return all;
      }, {});

      res.cookie('feature-toggle', flippedWithValues, {
        httpOnly: true,
        maxAge: 31536000000 // one year
      });
    } else {
      res.clearCookie('feature-toggle', {
        httpOnly: true
      });
    }
  }

  req.features = features;
  req.f = (feature) => req.features[feature];

  next();
};

module.exports = { featuresMiddleware, getEnabledFeatures };
