import { getFactsResource } from '../reducers/resources';

export const type = 'facts';

export function handler(dispatch, getState) {
  const state = getState();
  const facts = getFactsResource(state);

  if (!facts) {
    return;
  }

  dispatch({
    type: 'UPDATE_FACTS',
    payload: facts
  });
}
