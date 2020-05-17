import React from 'react';
import { StaticRouter } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CreateContext from '../utils/create-context';
import reducers, { getDefaultStateFromProps } from '../reducers';
import App from '../App';

export default class ServerApp extends React.Component {
  render() {
    const {
      initialState: { config, translations, language }
    } = this.props;
    const helpers = {
      config,
      translations,
      language
    };

    const store = createStore(
      enableBatching(reducers),
      getDefaultStateFromProps(this.props.initialState),
      applyMiddleware(thunk)
    );

    return (
      <Provider store={store}>
        <StaticRouter location={this.props.url} context={this.props.context}>
          <CreateContext helpers={helpers}>
            <App facts={this.props.initialState.facts} />
          </CreateContext>
        </StaticRouter>
      </Provider>
    );
  }
}
