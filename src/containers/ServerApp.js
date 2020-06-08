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
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

export default class ServerApp extends React.Component {
  render() {
    const {
      initialState: { helpers }
    } = this.props;

    const store = createStore(
      enableBatching(reducers),
      getDefaultStateFromProps(this.props.initialState),
      applyMiddleware(thunk)
    );

    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <StaticRouter location={this.props.url} context={this.props.context}>
            <CreateContext helpers={helpers}>
              {renderRoutes(Routes)}
            </CreateContext>
          </StaticRouter>
        </Provider>
      </ThemeProvider>
    );
  }
}

//Exposed to server(node) so that we can only use 1 build file for server
export const RouteConfig = Routes;
