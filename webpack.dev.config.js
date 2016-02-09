/**
 * Import modules
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Initialization
 */
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var metadata = {
  ENV: ENV
};

/**
 * Module export for Webpack
 */
module.exports = {

  // static data for index.html
  metadata: metadata,

  devtool: 'source-map',
  debug: true,

  entry: {
    'vendor': './src/vendor.ts',
    'bootstrap': './src/bootstrap.ts'
  },

  output: {
    path: './src',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.html', '.scss']
  },

  module: {
    preLoaders: [
      { test: /\.ts$/, loader: "tslint-loader", exclude: [/node_modules/] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'ng-annotate!nginject?deprecate!ts-loader' },
      { test: /\.json$/,  loader: 'json-loader' },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.html$/, loader: "raw-loader" },
      { test: /\.(ttf|eot|svg|woff(2)?).*$/, loader: "file-loader?name=fonts/[name].[ext]" }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    }),
    new HtmlWebpackPlugin({
      env: 'development',
      template: './src/index.html',
      inject: false
    })
  ],

  // Webpack Development Server config
  devServer: {
    historyApiFallback: true,
    contentBase: './src',
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
