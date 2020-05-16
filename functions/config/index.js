const loadConfig = require('./load-config');

const resolve = require('path').resolve;

const { HOST_ENV } = process.env;

const folders = [resolve(__dirname, `./envs`)];

const envs = HOST_ENV ? ['default', HOST_ENV] : ['default'];

const config = loadConfig(folders, envs, require);

const stripMatchingKeys = require('../utils/strip-matching-keys');
const stripPrivateKeys = stripMatchingKeys((key) => /^_/.test(key));
const stripPublicKeys = stripMatchingKeys((key) => /^[^_]/.test(key));
const keys = config();

const publicConfig = stripPrivateKeys(keys);
const privateConfig = stripPublicKeys(keys);

module.exports = {
  publicConfig,
  privateConfig,
  config
};
module.exports.default = config;
