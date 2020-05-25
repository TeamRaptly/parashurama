import React from 'react';
import { connect } from 'react-redux';
import helpers from '../../helpers';
import { Helmet } from 'react-helmet';
import App from '../App';
import { fetchResources } from '../../actions/resources-action-creators';

@connect(null, { fetchResources })
@helpers(['c', 't'])
export default class Home extends React.Component {
  // TODO: remove me
  // Used to see how dynamic resource fetching should work
  // componentDidMount() {
  // console.log('Component did mount called...and resource fetch started');
  // this.props.fetchResources({ resources: ['facts'], dependencies: 'abc' });
  // }

  render() {
    return (
      <>
        <Helmet>
          <title>Home page</title>
        </Helmet>
        <p>Home Page - {this.props.t('welcome')}</p>
        <div>All the configs available: {JSON.stringify(this.props.c())}</div>
        <App />
      </>
    );
  }
}
