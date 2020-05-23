const { resourcesList } = require('../resources');

const objectPromises = async (obj) => {
  const keys = Object.keys(obj);
  const promises = Object.values(obj);
  const results = await Promise.all(promises);

  return keys.reduce((result, key, i) => {
    result[key] = results[i];
    return result;
  }, {});
};

const fetchResources = (req, res, resources) => {
  const fetchedPromises = {};

  resources.reduce((rcs, resourceName) => {
    const resourceToFetch = resourcesList[resourceName];

    if (typeof resourceToFetch !== 'undefined') {
      rcs[resourceName] = resourceToFetch(req, res);
    }

    return rcs;
  }, fetchedPromises);

  return fetchedPromises;
};

const loadRouteData = async (req, res, { resources }) => {
  const promises =
    Array.isArray(resources) && resources.length
      ? fetchResources(req, res, resources)
      : Promise.resolve(null);

  return await objectPromises(promises);
};

module.exports = { loadRouteData };
