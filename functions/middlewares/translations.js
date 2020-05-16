const fs = require('fs');
const path = require('path');
const { recursive: recursiveMerge } = require('merge');
const { config } = require('../config');
const createGetter = require('../config/create-getter');

function createTranslations(translationFiles, locales) {
  return locales.reduce((translations, lang) => {
    const [locale] = lang.split('-');
    const translationsWithRegionOverrides = recursiveMerge(
      true,
      translationFiles[locale] || {},
      translationFiles[lang] || {}
    );

    return recursiveMerge(true, translations, {
      [lang]: translationsWithRegionOverrides
    });
  }, {});
}

const readJSONfiles = (jsonDir) => {
  const tmpObj = {};

  fs.readdirSync(jsonDir).forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    tmpObj[file.split('.')[0]] = require(path.resolve(jsonDir, file));
  });

  return tmpObj;
};

const translationsObject = {
  readJSONfiles: readJSONfiles(path.resolve(__dirname, `../locales/`))
};

module.exports.translations = function (req, res, next) {
  const allLocales = createTranslations(
    translationsObject.readJSONfiles,
    config('supportedLanguages')
  );

  res.locals.translations = allLocales;
  req.translations = createGetter(allLocales);
  next();
};
