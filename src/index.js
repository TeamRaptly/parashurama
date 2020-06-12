// Polyfilling
require('core-js');
require('regenerator-runtime/runtime');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.HOST_ENV = process.env.HOST_ENV || 'local';
process.env.IS_SERVER = true;

const optimiseForProduction = process.env.NODE_ENV === 'production';

const nodePreset = () => {
  const presets = ['@babel/preset-react'];
  const plugins = [
    // Stage 2
    ['@babel/plugin-proposal-decorators', { legacy: true }],

    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-transform-classes', {}, 'transform-classes']
  ];

  presets.push([
    '@babel/preset-env',
    {
      modules: 'commonjs',
      targets: {
        node: 'current'
      },
      useBuiltIns: 'entry',
      corejs: 3
    }
  ]);

  if (optimiseForProduction) {
    plugins.push(
      [
        'babel-plugin-transform-react-remove-prop-types',
        {
          mode: 'remove',
          removeImport: true
        }
      ],
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements'
    );
  }
  // eslint-disable-next-line func-names
  return function fn() {
    return {
      presets,
      plugins
    };
  };
};

// Enable next imported files to be ES6+
require('@babel/register')({
  babelrc: false,
  presets: [nodePreset()],
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: [/node_modules/, /build/, /public/],
  cache: !optimiseForProduction,
  extensions: ['.js', '.jsx']
});

module.exports.hanumanServer = require('./server').hanumanServer;
