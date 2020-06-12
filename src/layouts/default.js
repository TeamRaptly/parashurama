import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { Switch } from '@material-ui/core';
import { toggleThemeType } from '../actions/app-theme-action-creators';
import { getCurrentThemeType } from '../reducers/app-theme';
import { NoSsr } from '@material-ui/core';

const mapStateToProps = (state) => ({
  themeType: getCurrentThemeType(state)
});

function DefaultLayout(props) {
  return (
    <>
      <h1>Header</h1>
      <NoSsr>
        <Switch
          checked={props.themeType === 'light' ? false : true}
          onChange={props.toggleThemeType}
          color="primary"
          name="theme-type-changer"
          inputProps={{ 'aria-label': 'Change theme' }}
        />
      </NoSsr>
      {renderRoutes(props.route.routes)}
      <h1>Footer</h1>
    </>
  );
}

export default connect(mapStateToProps, { toggleThemeType })(DefaultLayout);
