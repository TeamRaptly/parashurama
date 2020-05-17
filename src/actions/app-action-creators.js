import axios from 'axios';

export const changeLanguage = (payload) => async (dispatch, getState) => {
  try {
    const response = await axios.post('/set-language', {
      language: 'kn'
    });
    if (response.status === 200) {
      dispatch({
        type: 'UPDATE_APP_STATE',
        payload
      });
      window.location.reload();
    }
  } catch (err) {
    console.error('Error changing language>>>>', err);
  }
};
