module.exports.language = function (req, res, next) {
  const defaultLanguage = req.config('defaultLanguage');
  const userSelectedLanguage = req.cookies && req.cookies.selectedLanguage;
  const selectedLanguage = userSelectedLanguage || defaultLanguage;

  if (!userSelectedLanguage) {
    res.cookie('selectedLanguage', defaultLanguage, {
      maxAge: 31536000000 // one year
    });
  }

  req.language = res.locals.language = selectedLanguage;
  next();
};
