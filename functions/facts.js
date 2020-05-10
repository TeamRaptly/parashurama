const fetch = require('isomorphic-fetch');

module.exports.getFacts = () => {
  return fetch('https://ssr-react.firebaseio.com/facts.json').then((res) =>
    res.json()
  );
};
