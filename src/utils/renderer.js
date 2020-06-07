const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { ServerStyleSheet } = require('styled-components');
const {
  ServerStyleSheets: MaterialServerStyleSheets
} = require('@material-ui/core/styles');
const serialize = require('serialize-javascript');
const { matchRoutes } = require('react-router-config');
const { loadRouteData } = require('./gather-route-dependent-resources');
const { Helmet } = require('react-helmet');

const fetchDependantServerSideResources = async (req, res) => {
  const routeConfig = require('../build/routes.bundle.js').default;
  const branch = matchRoutes(routeConfig, req.url);
  const foundBranch = branch.find(
    ({ route, match }) =>
      Array.isArray(route.resources) && route.resources.length
  );
  const {
    route: { bundle: bundleToLoad }
  } = branch.find(({ route }) => route.bundle);

  let fetchedResources = null;

  if (foundBranch) {
    fetchedResources = await loadRouteData(req, res, {
      resources: foundBranch.route.resources
    });
  }
  return { fetchedResources, bundleToLoad };
};

// Helper function to get the markup from React, inject the initial state, and
// send the server-side markup to the client
const renderApplication = (req, res) => {
  // If initial state is an input from browser or a response from api
  // which can have xss script then use https://github.com/YahooArchive/xss-filters
  // for filtering inputs and then pass to state
  return fetchDependantServerSideResources(req, res).then(
    ({ fetchedResources: resources, bundleToLoad }) => {
      const updatedInitialState = {
        ...res.locals.props,
        ...resources
      };

      const sheet = new ServerStyleSheet();
      const materialSheets = new MaterialServerStyleSheets();

      try {
        const ServerApp = React.createElement(
          require('../build/server.bundle.js').default,
          { url: req.url, context: {}, initialState: updatedInitialState }
        );
        const collectedStyles = sheet.collectStyles(
          materialSheets.collect(ServerApp)
        );
        const html = ReactDOMServer.renderToString(collectedStyles);

        // Pick Helmet properties
        // Should be placed after renderToString
        const helmet = Helmet.renderStatic();

        // Collect your styled-components style tags
        const styleTags = sheet.getStyleTags();

        // Grab the Material UI CSS from the sheets.
        const materialStyleCSS = materialSheets.toString();

        // Load hbs layout - index.hbs
        // with main.hbs(default hbs behaviour) layout
        return res.render('index', {
          reactApp: html,
          initialState: `${serialize(updatedInitialState)}`,
          title: helmet.title.toString(),
          styles: styleTags,
          materialStyles: materialStyleCSS,
          // bundles to load per page
          // Check if we can do this automated using webpack
          bundles: [`${bundleToLoad || 'home'}`]
        });
      } catch (error) {
        // handle error
        console.error('Error while rendering server app>>>>>>', error);
      } finally {
        sheet.seal();
      }
    }
  );
};

module.exports.renderApp = renderApplication;
