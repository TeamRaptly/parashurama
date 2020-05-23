export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_FETCHING_RESOURCES':
      return {
        ...state,
        loading: !!action.payload
      };
    default:
      return state;
  }
}

export const getDefaultStateFromProps = (props) => {
  return {
    loading: false
  };
};

export const getLoading = ({ ui: { loading } }) => loading;
