import axios from 'axios';
import { matchRoutes } from 'react-router-config';
import { setResourceLoading } from './ui-action-creators';
import resourceSignatures from '../resource-signatures';

export const fetchRouteResources = (routeConfig, location) => async (
  dispatch,
  getState
) => {
  try {
    const branch = matchRoutes(routeConfig, location.pathname);

    branch.forEach(async ({ route, match }) => {
      if (Array.isArray(route.resources) && route.resources.length) {
        dispatch(
          fetchResources({
            resources: route.resources,
            location: location.pathname,
            match
          })
        );
      }
    });
  } catch (error) {
    console.error('Error fetching route resources>>>>', err);
  }
};

export const fetchResources = ({ resources, ...rest }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setResourceLoading(true));
    const { status, data } = await axios.post('/resources', {
      resources,
      ...rest
    });

    if (status === 200) {
      dispatch({
        type: 'RESOURCES_RECEIVED',
        payload: data
      });

      syncResources(resources, dispatch, getState);
    }
  } catch (err) {
    console.error('Error fetching facts>>>>', err);
  } finally {
    dispatch(setResourceLoading(false));
  }
};

const syncResources = (resourceNames, dispatch, getState) => {
  resourceNames.forEach((resName) => {
    const { handler } = getResourceSignature(resName);

    if (handler) {
      handler(dispatch, getState);
    }
  });
};

function getResourceSignature(type) {
  const signature = resourceSignatures[type];

  if (!signature) {
    throw new ReferenceError(`The resource of type '${type}' is invalid.`);
  }

  return signature;
}
