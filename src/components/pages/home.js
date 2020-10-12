import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import helpers from '../../helpers';
import { Helmet } from 'react-helmet';
import App from '../App';
import { fetchResources } from '../../actions/resources-action-creators';
import { withStyles } from '@material-ui/core/styles';
import ImageData from '../../utils/imageData';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = (theme) => ({
  breakpoint: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '300px'
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
      height: '400px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      height: '450px'
    }
  }
});

@withStyles(useStyles)
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
    const { classes } = this.props;
    return (
      <>
        <Helmet>
          <title>Home page</title>
        </Helmet>
        <Grid container justify="center">
          {ImageData.map((tile) => (
            <Grid item xs={12} sm={6} md={6}>
              <Button component={RouterLink} to="/about">
                <img src={tile.img} className={classes.breakpoint} />
              </Button>
            </Grid>
          ))}
        </Grid>
        <p>Home Page - {this.props.t('welcome')}</p>
        <div>All the configs available: {JSON.stringify(this.props.c())}</div>
        <App />
      </>
    );
  }
}
