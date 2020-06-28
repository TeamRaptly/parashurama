import { getCurrentThemeType } from '../reducers/app-theme';

export const toggleThemeType = () => (dispatch, getState) => {
  const type = getCurrentThemeType(getState());

  dispatch({
    type: 'CHANGE_THEME_TYPE',
    payload: type === 'light' ? 'dark' : 'light'
  });
};
