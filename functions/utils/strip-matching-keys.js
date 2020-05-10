const stripMatchingKeys = (matches) => (obj) => {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!matches(key)) {
      acc[key] = stripMatchingKeys(matches)(value);
    }
    return acc;
  }, {});
};

module.exports = stripMatchingKeys;
