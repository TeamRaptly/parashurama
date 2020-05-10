// Config system
// takes a list of folders and envs and merges the configs
// folders have a higher priority than envs therefore the order of merge is:
// folder1, env1
// folder1, env2
// folder2, env1
// folder2, env2

const createGetter = require('./create-getter');

const { reduce, mergeDeepRight, xprod, map } = require('ramda');

const deepMergeAll = reduce(mergeDeepRight, {});

const pathFromFolderAndEnv = ([folder, env]) => `${folder}/${env}.js`;

const loadConfig = (folders, envs, load) => {
  const folderEnvCombinations = xprod(folders, envs);
  const configFiles = map(pathFromFolderAndEnv, folderEnvCombinations);
  const configs = map(load, configFiles);
  return deepMergeAll(configs);
};

module.exports = (folders = ['./'], envs = ['test'], load = require) => {
  const conf = loadConfig(folders, envs, load);
  return createGetter(conf);
};
