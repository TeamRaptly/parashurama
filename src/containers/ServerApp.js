import React from 'react';
import { StaticRouter } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import CreateContext from '../utils/create-context';
import reducers, { getDefaultStateFromProps } from '../reducers';
import Routes from '../route-config';
import ThemeContext from '../utils/theme-context';

export default function ServerApp(props) {
  const {
    initialState: { helpers }
  } = props;

  const store = createStore(
    enableBatching(reducers),
    getDefaultStateFromProps(props.initialState),
    applyMiddleware(thunk)
  );

  return (
    <Provider store={store}>
      <ThemeContext>
        <StaticRouter location={props.url} context={props.context}>
          <CreateContext helpers={helpers}>
            {renderRoutes(Routes)}
          </CreateContext>
        </StaticRouter>
      </ThemeContext>
    </Provider>
  );
}

//Exposed to server(node) so that we can only use 1 build file for server
export const RouteConfig = Routes;
