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
import { Divider, List, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles(theme => ({
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
        marginBottom: "15px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
        fontSize: "18px"
    },
    heroButton: {
        display: "flex",
        textAlign: "center",
        marginBottom: "15px",
        width: "100%",
        maxWidth: "250px",
        textTransform: 'none',
        backgroundColor: "#ffffff",
    },
    icon: {
        marginRight: "8px"
    },
    listButton: {
        justifyContent: "center",
    },
    listButton1: {
        justifyContent: "center",
    },
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
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        id="password"
                        autoComplete="current-password"
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Divider />
            {/* <div className={classes.paper}>
                <Button variant="contained" className={classes.listButton} component={RouterLink} to="/mobile-otp">
                    <div className={classes.icon}>
                        <PhoneIcon />
                    </div>                    
                    Sign in with phone
                </Button>
                <Button
                    startIcon={<img alt="Google OAuth" src="/assets/images/btn_google_light_pressed_ios.svg" />}

                    variant="contained"
                    className={classes.listButton2}
                    component={RouterLink}
                    to=""
                >
                    Sign in with Google
                </Button>
            </div> */}

            <div>
                <ListItem className={classes.listButton}>
                    <Button variant="contained" className={classes.heroButton} component={RouterLink} to="/mobile-otp">
                        <div className={classes.icon}>
                            <PhoneIcon />
                        </div>                    
                            Sign in with phone
                    </Button>
                </ListItem>
                <ListItem className={classes.listButton1}>
                    <Button variant="contained" className={classes.heroButton} component={RouterLink}>
                        <div className={classes.icon}>
                            <Avatar alt="google" src="/assets/images/btn_google_light_pressed_ios.svg" />
                        </div>
                            Sign in with google
                     </Button>
                </ListItem>
            </div>

        </Container>
    );
};

export default LoginView;


