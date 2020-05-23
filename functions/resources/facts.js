const { getFacts } = require('../facts');

module.exports.factsResource = async (req, res) => {
  let facts = null;

  console.log('>>>Fetching facts from server resources...');

  try {
    facts = await getFacts(req, res, {});
  } catch (err) {
    console.error('Error featching facts resource...', err);
  }

  return facts;
};
