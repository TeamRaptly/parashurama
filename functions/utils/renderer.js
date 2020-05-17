const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { template } = require('./html-template');

// Helper function to get the markup from React, inject the initial state, and
// send the server-side markup to the client
const renderApplication = (req, res, initialState, pageTitle) => {
  const { config, translations, language, props } = res.locals;
  const updatedInitialState = {
    ...initialState,
    config,
    translations,
    language,
    ...props
  };
  const ServerApp = React.createElement(
    require('../build/server.bundle.js').default,
    { url: req.url, context: {}, initialState: updatedInitialState }
  );
  const html = ReactDOMServer.renderToString(ServerApp);
  const templatedHtml = template({
    body: html,
    initialState: updatedInitialState,
    title: pageTitle
  });

  res.send(templatedHtml);
};

module.exports.renderApp = renderApplication;
