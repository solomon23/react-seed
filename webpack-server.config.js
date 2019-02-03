const path = require('path')
const fs = require('fs')
const ParseRoutePaths = require('./tools/parse-routes.js')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MakeDirWebpackPlugin = require('make-dir-webpack-plugin')

// make sure a temp directory exists
if (!fs.existsSync('./.tmp')) {
  fs.mkdirSync('./.tmp/')
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist/')
}

const serverConfig = {
  entry: [
    '@babel/polyfill', './src/server/server.js',
  ],
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  target: 'node',
  externals: [
    nodeExternals(),
  ],
  plugins: [
    new CopyWebpackPlugin([{ from: './src/server/templates', to: 'templates' }]),
    new CopyWebpackPlugin([{ from: './ecosystem.config.js', to: './' }]),
    new CopyWebpackPlugin([{ from: './package.json', to: './' }]),
    new MakeDirWebpackPlugin({ dirs: [{ path: path.join(__dirname, 'dist', 'logs') }] }),
    new ParseRoutePaths({ src: './src/client/javascripts/routes', output: path.join(__dirname, 'dist', 'routes.json') }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            cacheDirectory: './.tmp',
          },
        },
      },
    ],
  },
}

/**
 * @see http://webpack.github.io/docs/configuration.html
 * for webpack configuration options
 */
module.exports = serverConfig
