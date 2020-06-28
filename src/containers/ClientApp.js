import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
import CreateContext from '../utils/create-context';
import reducers, { getDefaultStateFromProps } from '../reducers';
import PendingNavDataLoader from '../utils/pending-nav-data-loader';
import Routes from '../route-config';
import ThemeContext from '../utils/theme-context';

function ClientApp() {
  const store = createStore(
    enableBatching(reducers),
    getDefaultStateFromProps(window.__initialState),
    applyMiddleware(thunk)
  );

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext>
        <BrowserRouter>
          <CreateContext>
            <PendingNavDataLoader routes={Routes}>
              {renderRoutes(Routes)}
            </PendingNavDataLoader>
          </CreateContext>
        </BrowserRouter>
      </ThemeContext>
    </Provider>
  );
}

ReactDOM.hydrate(<ClientApp />, document.getElementById('root'));
