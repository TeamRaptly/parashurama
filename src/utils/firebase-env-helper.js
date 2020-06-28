import * as functions from 'firebase-functions';

const config = functions.config();

// Porting envs from firebase config
for (const key in config.envs) {
  process.env[key.toUpperCase()] = config.envs[key];
}
