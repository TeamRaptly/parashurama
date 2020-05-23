import createGetter from './create-getter';

/**
 * On the server-side this wraps helpers and stores the output when necessary
 * within the `data` object. This is then serialised afterwards into JSON and
 * placed in an attribute for each section on the root HTML node.
 *
 * On the client-side this wraps calls to retrieve the relevant data from the
 * attributes containing the serialised JSON and returns it for the component.
 */
class Helpers {
  constructor(data) {
    this._config = createGetter(data.config);
    this._features = data.features;
    this._featuresDefinitions = data.featuresDefinitions;
    this._language = data.language;
    this._translations = createGetter(data.translations[this._language]);
  }

  c(configKey) {
    return this._config(configKey);
  }

  f(feature) {
    return this._features[feature];
  }

  featuresDefinitions() {
    return this._featuresDefinitions;
  }

  language() {
    return this._language;
  }

  t(key) {
    return this._translations(key);
  }
}

export default Helpers;
