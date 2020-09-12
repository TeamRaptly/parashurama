import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import hbs from 'express-handlebars';
import path from 'path';
import { renderApp } from './utils/renderer';
import { loadRouteData } from './utils/gather-route-dependent-resources';
import { language } from './middlewares/language';
import { translations } from './middlewares/translations';
import { config } from './middlewares/config';
import { allPropsHelper } from './middlewares/locals-props-helper';
import { enhanceLocalsProps } from './middlewares/enhance-locals-props';
import { featuresMiddleware } from './middlewares/features';

const app = express();
const port = process.env.PORT || 3000;

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
app.use(compression());

app.use(enhanceLocalsProps);
app.use(config);
app.use(language);
app.use(translations);
app.use(featuresMiddleware);
app.use(allPropsHelper);

app.use('/', express.static(path.join(__dirname, 'public')));

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

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server listening on PORT: ${port}`));
