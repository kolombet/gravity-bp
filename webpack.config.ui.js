const util = require('util');

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const env = require('./env');

const config = {
  [env.envs.dev]: {
    devServer: {
      contentBase: './public',
      historyApiFallback: true,
    },
  },
  [env.envs.prod]: {
    plugins: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
          },
        },
      }),
      new UglifyJSPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          keep_fnames: true,
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: false,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          drop_console: true,
          booleans: true,
        },
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      new SWPrecacheWebpackPlugin({
        cacheId: 'gravity-bp',
        dontCacheBustUrlsMatching: /\.\w{20}\./,
        filename: 'sw.js',
        minify: true,
        navigateFallback: '/',
        stripPrefix: 'public/',
        swFilePath: 'public/sw.js',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json/],
        dynamicUrlToDependencies: {
          '/': [...glob.sync(`[name].js`)],
        },
        runtimeCaching: [
          {
            urlPattern: /.*/,
            handler: 'networkFirst',
          },
        ],
      }),
    ],
  },
  all: {
    cache: true,
    entry: {
      index: './src/index.tsx',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss', '.css', '.twig'],
    },
    plugins: [
      new CleanWebpackPlugin(['public'], {
        watch: true,
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
      }),
      new HtmlWebpackPlugin({
        template: 'src/views/index.twig',
        inject: 'body',
        title: 'Gravity Boilerplate by Jonny Asmar',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
        {
          test: /\.twig$/,
          loader: 'twig-loader',
        },
      ],
    },
    watchOptions: {
      ignored: [/api/, /public/, /node_modules/],
    },
  },
};

//console.log(util.inspect(merge(common, config.all, config[env.env]), {depth: null}));

module.exports = merge(common, config.all, config[env.env]);