import { combineReducers } from 'redux';
import appState, * as fromApp from './app-state';

export default combineReducers({
  app: appState
});

export const getDefaultStateFromProps = (props) => ({
  app: fromApp.getDefaultStateFromProps(props)
});
