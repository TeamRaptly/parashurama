// Polyfilling
require('core-js');
require('regenerator-runtime/runtime');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.HOST_ENV = process.env.HOST_ENV || 'local';
process.env.IS_SERVER = true;

const optimiseForProduction = process.env.NODE_ENV === 'production';

// needed to prevent syntax errors when running code on server.
// dynamic imports still need to be wrapped in if (!process.env.CLIENT_SIDE) { ... }
// or similar
const renameDynamicImports = () => ({
  visitor: {
    CallExpression(path) {
      if (path.node.callee.type === 'Import') {
        path.replaceWith(
          types.stringLiteral('Dynamic imports not supported on server')
        );
      }
    }
  }
});

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

  return function () {
    return {
      presets: presets,
      plugins: plugins
    };
  };
};

//Enable next imported files to be ES6+
require('@babel/register')({
  babelrc: false,
  presets: [nodePreset()],
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: [/node_modules/, /build/, /public/],
  cache: !optimiseForProduction,
  plugins: [renameDynamicImports],
  extensions: ['.js', '.jsx']
});

module.exports.hanumanServer = require('./server').hanumanServer;
