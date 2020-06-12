import { combineReducers } from 'redux';
import appState, * as fromApp from './app-state';
import appThemeState, * as fromAppTheme from './app-theme';
import factsState, * as fromFacts from './facts';
import uiState, * as fromUI from './ui';
import resourcesState, * as fromResources from './resources';

export default combineReducers({
  app: appState,
  appTheme: appThemeState,
  facts: factsState,
  resources: resourcesState,
  ui: uiState
});

export const getDefaultStateFromProps = (props) => ({
  app: fromApp.getDefaultStateFromProps(props),
  appTheme: fromAppTheme.getDefaultStateFromProps(props),
  facts: fromFacts.getDefaultStateFromProps(props),
  resources: fromResources.getDefaultStateFromProps(props),
  ui: fromUI.getDefaultStateFromProps(props)
});
