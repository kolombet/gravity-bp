const path = require('path');
const webpack = require('webpack');
const env = require('./env');

const config = bundle => ({
  mode: 'none',
  plugins: [new webpack.DefinePlugin(env.definedVars(bundle))],
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      actions: path.resolve(__dirname, 'src/actions'),
      daos: path.resolve(__dirname, 'src/daos'),
      components: path.resolve(__dirname, 'src/components'),
      env: path.resolve(__dirname, 'env'),
      models: path.resolve(__dirname, 'src/models'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      root: path.resolve(__dirname),
      selectors: path.resolve(__dirname, 'src/selectors'),
      services: path.resolve(__dirname, 'src/services'),
      src: path.resolve(__dirname, 'src'),
      styles: path.resolve(__dirname, 'src/styles'),
      tables: path.resolve(__dirname, 'src/tables'),
      utils: path.resolve(__dirname, 'src/utils'),
      views: path.resolve(__dirname, 'src/views'),
    },
  },
  watchOptions: {
    ignored: [/^api/, /^app/, /^node_modules/],
  },
});

module.exports = config;
