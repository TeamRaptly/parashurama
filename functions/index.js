const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { getFacts } = require('./facts');
const { renderApp } = require('./utils/renderer');

const { language } = require('./middlewares/language');
const { translations } = require('./middlewares/translations');
const { config } = require('./middlewares/config');
const { allPropsHelper } = require('./middlewares/locals-props-helper');
const { enhanceLocalsProps } = require('./middlewares/enhance-locals-props');

const app = express();

process.env.IS_SERVER = true;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(enhanceLocalsProps);
app.use(config);
app.use(language);
app.use(translations);
app.use(allPropsHelper);

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

app.post('/set-language', (req, res) => {
  const receivedLanguage = req.body.language;
  res.cookie('selectedLanguage', receivedLanguage, {
    maxAge: 31536000000 // one year
  });

  // res.format({
  //   html: use renderTemplate here for server side render,
  //   json: res.status(200).json({ language: receivedLanguage })
  // });
  res.status(200).json({ language: receivedLanguage });
});

app.get('/', (req, res) => {
  return getFacts().then((facts) => {
    res.set('Cache-Control', 'public, max-age=600, s-max-age=1200');

    return renderApp(req, res, { facts }, 'Home Page');
  });
});

app.get('/about', (req, res) => {
  return getFacts().then((facts) => {
    res.set('Cache-Control', 'public, max-age=600, s-max-age=1200');

    return renderApp(req, res, { facts }, 'About Page');
  });
});

app.get('*', (req, res) => {
  res.status(400).send('Error');
});

module.exports.hanumanServer = functions.https.onRequest(app);
