import React from 'react';
import { connect } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
    <ThemeProvider theme={modifiedTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default connect(mapStateToProps)(ThemeContext);
