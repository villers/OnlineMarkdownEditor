/**
 * Import modules
 */
var webpack = require('webpack');
var fs = require('fs');
var WebpackOnBuildPlugin = require('on-build-webpack');
var AppCachePlugin = require('appcache-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Initialization
 */
var BUILD_DIR = './build/';
var BUILD_FILES = [];
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var metadata = {
  ENV: ENV
};

/**
 * Module export for Webpack
 */
module.exports = {

  // static data for index.html
  metadata: metadata,

  entry: {
    'vendor': './src/vendor.ts',
    'bootstrap': './src/bootstrap.ts'
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.html', '.scss']
  },

  module: {
    loaders: [
      { test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'compilerOptions': {
            'removeComments': true
          }
        },
        exclude: [ /\.(spec|e2e)\.ts$/ ]
      },
      { test: /\.json$/,  loader: 'json-loader' },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(ttf|eot|svg|woff(2)?).*$/, loader: "file-loader?name=app/fonts/[name].[ext]" }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    }),
    new WebpackOnBuildPlugin(function() {
      BUILD_FILES = fs.readdirSync(BUILD_DIR).filter(function (file) {
        return fs.statSync(BUILD_DIR + file).isFile();
      });
    }),
    new AppCachePlugin({
      cache: BUILD_FILES,
      network: ['*'], // every else need network
      output: 'manifest.appcache'
    }),
    new HtmlWebpackPlugin({
      env: 'production',
      template: 'src/index.html',
      inject: false
    }),
    new CopyWebpackPlugin([
      { from: './src/app', to: 'app' },
      { from: './src/Web.config' }
    ], { ignore: ['*.ts', '*.scss', '*.html', '*.styl'] })
  ],

  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
