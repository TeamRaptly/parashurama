const path = function (keys, conf) {
  return keys.reduce(
    //(acc, key) => (typeof acc === 'undefined' ? acc : acc[key]),
    function (acc, key) {
      return typeof acc == 'undefined' ? acc : acc[key];
    },
    conf
  );
};

//module.exports = conf => key => (key ? path(key.split('.'), conf) : conf);
module.exports = function (conf) {
  return function (key) {
    return key ? path(key.split('.'), conf) : conf;
  };
};
