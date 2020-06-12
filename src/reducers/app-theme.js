export default function (state = {}, action) {
  switch (action.type) {
    case 'CHANGE_THEME_TYPE':
      return { ...state, type: action.payload };
    default:
      return state;
  }
}

export const getDefaultStateFromProps = (props) => {
  return (props && props.appTheme) || { type: 'light' };
};

export const getCurrentThemeType = ({ appTheme }) => appTheme && appTheme.type;
