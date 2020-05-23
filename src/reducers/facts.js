export default function (state = {}, action) {
  switch (action.type) {
    case 'UPDATE_FACTS':
      //Replacing the old state with fetched resource data(only for demo)
      return [...action.payload];
    default:
      return state;
  }
}

export const getDefaultStateFromProps = (props) => {
  const facts = (props && props.facts) || [];

  return facts;
};

export const getFacts = ({ facts }) => facts;
