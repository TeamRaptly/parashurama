export default (state = {}, action) => {
  switch (action.type) {
    case 'RESOURCES_RECEIVED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getDefaultStateFromProps = (props) => {
  const resources = (props && props.resources) || {};

  return resources;
};

const getResource = (resourcesName) => (state) =>
  state?.resources?.[resourcesName];

export const getFactsResource = getResource('facts');
