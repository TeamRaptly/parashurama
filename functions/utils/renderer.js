const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { ServerStyleSheet } = require('styled-components');
const serialize = require('serialize-javascript');
const { matchRoutes } = require('react-router-config');
const { loadRouteData } = require('./gather-route-dependent-resources');

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
const renderApplication = (req, res, initialState, pageTitle) => {
  // If initial state is an input from browser or a response from api
  // which can have xss script then use https://github.com/YahooArchive/xss-filters
  // for filtering inputs and then pass to state
  return fetchDependantServerSideResources(req, res).then(
    ({ fetchedResources: resources, bundleToLoad }) => {
      const updatedInitialState = {
        ...initialState,
        ...res.locals.props,
        ...resources
      };

      const sheet = new ServerStyleSheet();

      try {
        const ServerApp = React.createElement(
          require('../build/server.bundle.js').default,
          { url: req.url, context: {}, initialState: updatedInitialState }
        );
        // const jsx = extractor.collectChunks(ServerApp);
        const collectedStyles = sheet.collectStyles(ServerApp);
        const html = ReactDOMServer.renderToString(collectedStyles);
        // Collect your style tags
        const styleTags = sheet.getStyleTags();

        // Load hbs layout - index.hbs
        // with main.hbs(default hbs behaviour) layout
        return res.render('index', {
          reactApp: html,
          initialState: `${serialize(updatedInitialState)}`,
          title: pageTitle,
          styles: styleTags,
          // bundles to load per page
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
