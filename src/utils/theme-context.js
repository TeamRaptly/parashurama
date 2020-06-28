import React from 'react';
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { getCurrentThemeType } from '../reducers/app-theme';
import { CssBaseline } from '@material-ui/core';
import theme from '../theme';

const mapStateToProps = (state) => ({
  currentThemeType: getCurrentThemeType(state)
});

// Dynamic theming support only for client side
function ThemeContext(props) {
  const modifiedTheme = createMuiTheme({
    ...theme,
    ...{
      palette: {
        type: props.currentThemeType
      }
    }
  });

  return (
    <MuiThemeProvider theme={modifiedTheme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}

export default connect(mapStateToProps)(ThemeContext);
