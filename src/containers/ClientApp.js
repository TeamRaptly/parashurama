import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import CreateContext from '../utils/create-context';
import reducers, { getDefaultStateFromProps } from '../reducers';
import App from '../App';

const store = createStore(
  enableBatching(reducers),
  getDefaultStateFromProps(window.__initialState),
  applyMiddleware(thunk)
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <CreateContext>
        <App facts={window.__initialState.facts} />
      </CreateContext>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
