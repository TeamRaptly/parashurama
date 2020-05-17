export default function (state = {}, action) {
  switch (action.type) {
    case 'UPDATE_APP_STATE':
      return {
        ...state,
        currentLanguage: action.payload
      };
    default:
      return state;
  }
}

export const getDefaultStateFromProps = (props) => {
  const app = (props && props.app) || null;

  return {
    alternateLanguage: (app && app.alternateLanguage) || null,
    csrfToken: (app && app.csrfToken) || '',
    currentLanguage: (app && app.currentLanguage) || null
  };
};

export const getCurrentLanguage = ({ app: { currentLanguage } }) =>
  currentLanguage;
