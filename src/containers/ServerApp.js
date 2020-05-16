import React from 'react';
import { StaticRouter } from 'react-router';
import CreateContext from '../utils/create-context';
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

    return (
      <StaticRouter location={this.props.url} context={this.props.context}>
        <CreateContext helpers={helpers}>
          <App facts={this.props.initialState.facts} />
        </CreateContext>
      </StaticRouter>
    );
  }
}
