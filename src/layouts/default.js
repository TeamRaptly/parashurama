import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { Switch, NoSsr } from '@material-ui/core';
import { toggleThemeType } from '../actions/app-theme-action-creators';
import { getCurrentThemeType } from '../reducers/app-theme';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Header from '../components/header';
import Footer from '../components/footer';

const mapStateToProps = (state) => ({
  themeType: getCurrentThemeType(state)
});

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

function DefaultLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <div className={classes.appBarSpacer} />
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
      <Divider />
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { toggleThemeType })(DefaultLayout);
