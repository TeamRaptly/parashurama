const path = function (keys, conf) {
  return keys.reduce(function (acc, key) {
    return typeof acc == 'undefined' ? acc : acc[key];
  }, conf);
};

module.exports = function (conf) {
  return function (key) {
    return key ? path(key.split('.'), conf) : conf;
  };
};
