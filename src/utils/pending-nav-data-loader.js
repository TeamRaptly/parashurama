import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { fetchRouteResources } from '../actions/resources-action-creators';
import { getLoading } from '../reducers/ui';
import routeConfig from '../route-config';
import Spinner from '../components/spinner';

const mapStateToProps = (state) => ({
  loading: getLoading(state)
});

class PendingNavDataLoader extends React.Component {
  state = {
    previousLocation: null,
    currentLocation: this.props.location
  };

  static getDerivedStateFromProps(props, state) {
    const currentLocation = props.location;
    const previousLocation = state.currentLocation;

    const navigated = currentLocation !== previousLocation;
    if (navigated) {
      // save the location so we can render the old screen
      return {
        previousLocation,
        currentLocation
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    const navigated = prevProps.location !== this.props.location;

    if (navigated) {
      // load data while the old screen remains

      this.props.fetchRouteResources(routeConfig, this.props.location);

      this.setState({
        previousLocation: this.props.loading && null
      });
    }
  }

  render() {
    const { children, location, loading } = this.props;
    const { previousLocation } = this.state;

    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    if (loading) {
      return <Spinner />;
    }

    return (
      <Route location={previousLocation || location} render={() => children} />
    );
  }
}

// wrap in withRouter
export default withRouter(
  connect(mapStateToProps, { fetchRouteResources })(PendingNavDataLoader)
);
