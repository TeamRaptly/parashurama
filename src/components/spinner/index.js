import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spinner: {
    position: 'fixed',
    top: '50%',
    left: '50%'
  },
  spinnerContainer: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%'
  }
});

const Spinner = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress className={classes.spinner} />
    </div>
  );
};

export default Spinner;
