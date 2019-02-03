const CleanWebpackPlugin = require('clean-webpack-plugin')
const serverConfig = require('./webpack-server.config')
const clientConfig = require('./webpack-client.config')

// clean out the dist folder
clientConfig.plugins.push(new CleanWebpackPlugin(['dist/public']))

/**
 * @see http://webpack.github.io/docs/configuration.html
 * for webpack configuration options
 */
module.exports = [clientConfig, serverConfig]
