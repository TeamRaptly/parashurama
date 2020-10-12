import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Divider, ListItem } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '15px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  heroButton: {
    display: 'flex',
    textAlign: 'center',
    marginBottom: '15px',
    width: '100%',
    maxWidth: '250px',
    textTransform: 'none',
    backgroundColor: '#ffffff'
  },
  listButton: {
    justifyContent: 'center'
  },
  listButton1: {
    justifyContent: 'center'
  },
  icon: {
    marginRight: '8px'
  }
}));

const LoginView = ({ onSubmit }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Phone OTP
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            id="standard-basic"
            label="Phone Number"
            fullWidth
            type="Phone"
            borderColor="primary"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            GET OTP
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/sign-up" variant="body2">
                {'Already have an account? Sign up'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Divider />
      <div>
        <ListItem className={classes.listButton}>
          <Button
            variant="contained"
            className={classes.heroButton}
            component={RouterLink}
            to="/sign-in"
          >
            <div className={classes.icon}>
              <EmailIcon />
            </div>
            Sign in with email
          </Button>
        </ListItem>
        <ListItem className={classes.listButton1}>
          <Button
            variant="contained"
            className={classes.heroButton}
            component={RouterLink}
          >
            <div className={classes.icon}>
              <Avatar
                alt="google"
                src="/assets/images/btn_google_light_pressed_ios.svg"
              />
            </div>
            Sign in with Google
          </Button>
        </ListItem>
      </div>
    </Container>
  );
};

export default LoginView;
