import { combineReducers } from 'redux';
import appState, * as fromApp from './app-state';
import factsState, * as fromFacts from './facts';
import uiState, * as fromUI from './ui';
import resourcesState, * as fromResources from './resources';

export default combineReducers({
  app: appState,
  facts: factsState,
  resources: resourcesState,
  ui: uiState
});

export const getDefaultStateFromProps = (props) => ({
  app: fromApp.getDefaultStateFromProps(props),
  facts: fromFacts.getDefaultStateFromProps(props),
  resources: fromResources.getDefaultStateFromProps(props),
  ui: fromUI.getDefaultStateFromProps(props)
});
