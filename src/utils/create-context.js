import { Component } from 'react';
import PropTypes from 'prop-types';
import _Helpers from './helpers';

export const contextTypes = {
  c: PropTypes.func.isRequired,
  f: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  language: PropTypes.func.isRequired
};

export default class CreateContext extends Component {
  static propTypes = {
    children: PropTypes.node,
    helpers: PropTypes.object
  };

  static childContextTypes = {
    helpers: PropTypes.shape(contextTypes).isRequired
  };

  constructor(props, context) {
    super(props, context);

    if (!process.env.IS_SERVER) {
      this._helpers = new _Helpers(window.__initialState.helpers);
    } else {
      this._helpers = new _Helpers(props.helpers);
    }

    this._childContext = {
      helpers: this._helpers
    };
  }

  getChildContext() {
    return this._childContext;
  }

  render() {
    return this.props.children;
  }
}
