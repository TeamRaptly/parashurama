// import red from '@material-ui/core/colors/red';

// Create a MUI theme instance.
// default theme set by MUI - https://material-ui.com/customization/default-theme/
const theme = {
  palette: {
    type: 'light'
    // primary: {
    //   main: '#556cd6'
    // },
    // secondary: {
    //   main: '#19857b'
    // },
    // error: {
    //   main: red.A400
    // },
    // background: {
    //   default: '#fff'
    // }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'ul li': {
          borderBottom: '1px dashed rgba(0, 0, 0, 0.42)'
        }
      }
    }
  }
};

export default theme;
