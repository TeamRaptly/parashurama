// Add the resource structure here to fetch all the resources for a given page
const { factsResource } = require('./facts');

const FACTS = 'facts';

module.exports.resourcesList = {
  [FACTS]: factsResource
};
