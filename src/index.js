const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');

const { renderApp } = require('./utils/renderer');
const { loadRouteData } = require('./utils/gather-route-dependent-resources');

const { language } = require('./middlewares/language');
const { translations } = require('./middlewares/translations');
const { config } = require('./middlewares/config');
const { allPropsHelper } = require('./middlewares/locals-props-helper');
const { enhanceLocalsProps } = require('./middlewares/enhance-locals-props');
const { featuresMiddleware } = require('./middlewares/features');

const app = express();

process.env.IS_SERVER = true;

// view engine setup
app.engine(
  'hbs',
  hbs({
    extname: 'hbs'
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(enhanceLocalsProps);
app.use(config);
app.use(language);
app.use(translations);
app.use(featuresMiddleware);
app.use(allPropsHelper);

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.get('/favicon.ico', (req, res) => {
  return res.sendStatus(204);
});

app.post('/set-language', (req, res) => {
  const receivedLanguage = req.body.language;
  res.cookie('selectedLanguage', receivedLanguage, {
    maxAge: 31536000000 // one year
  });

  return res.status(200).json({ language: receivedLanguage });
});

app.post('/resources', (req, res) => {
  return loadRouteData(req, res, req.body)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(400).send('Error fetching data>>>', err);
    });
});

app.get('*', (req, res) => {
  return renderApp(req, res, {});
});

module.exports.hanumanServer = functions.https.onRequest(app);
