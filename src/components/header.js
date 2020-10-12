import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import StorageIcon from '@material-ui/icons/Storage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  appLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SearchAppBar() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const list = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <div className={classes.demo}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>R</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Raptly" variant={'h6'} />
        </ListItem>
      </div>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Shop by Category" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Stock" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Shopping list" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Your Account" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText primary="User agreement" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ContactSupportIcon />
        </ListItemIcon>
        <ListItemText primary="Help" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="How this app works" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
      <ListItem button component={RouterLink} to="/sign-in">
        <ListItemIcon>
          <LockOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Sign In/Sign Up" />
      </ListItem>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar disableGutters={true}>
          <IconButton onClick={toggleDrawer('left', true)} color="inherit">
            {' '}
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            BackdropProps={{ invisible: true }}
            open={state.left}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </SwipeableDrawer>

          <Typography className={classes.title} variant="h6">
            <RouterLink className={classes.appLink} to="/">
              GroceriesPlus
            </RouterLink>
          </Typography>

          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
