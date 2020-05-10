const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const { getFacts } = require('./facts');
const { template } = require('./template');

const { translations } = require('./middlewares/translations');
const { config } = require('./middlewares/config');

const app = express();

process.env.IS_SERVER = true;

const ServerApp = React.createFactory(
  require('./build/server.bundle.js').default
);

// Helper function to get the markup from React, inject the initial state, and
// send the server-side markup to the client
const renderApplication = (req, res, initialState, pageTitle) => {
  const { config, translations } = res.locals;
  const serverInitialState = {
    ...initialState,
    config,
    translations
  };
  const clientInitialState = { ...initialState, config, translations };
  const html = ReactDOMServer.renderToString(
    ServerApp({ url: req.url, context: {}, initialState: serverInitialState })
  );
  const templatedHtml = template({
    body: html,
    initialState: JSON.stringify(clientInitialState),
    title: pageTitle
  });

  res.send(templatedHtml);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(config);
app.use(translations);

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

app.get('/', (req, res) => {
  return getFacts().then((facts) => {
    res.set('Cache-Control', 'public, max-age=600, s-max-age=1200');

    return renderApplication(req, res, { facts }, 'Home Page');
  });
});

app.get('/about', (req, res) => {
  return getFacts().then((facts) => {
    res.set('Cache-Control', 'public, max-age=600, s-max-age=1200');

    return renderApplication(req, res, { facts }, 'About Page');
  });
});

app.get('*', (req, res) => {
  res.status(400).send('Error');
});

module.exports.hanumanServer = functions.https.onRequest(app);
