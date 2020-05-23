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

const store = createStore(
  enableBatching(reducers),
  getDefaultStateFromProps(window.__initialState),
  applyMiddleware(thunk)
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <CreateContext>
        <PendingNavDataLoader routes={Routes}>
          {renderRoutes(Routes)}
        </PendingNavDataLoader>
      </CreateContext>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
