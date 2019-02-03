const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const PROD = (process.env.NODE_ENV === 'production')
const CONFIG_ENV = process.env.CONFIG_ENV

// make sure a temp directory exists
if (!fs.existsSync('./.tmp')) {
  fs.mkdirSync('./.tmp/')
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist/')
}

const clientConfig = {
  context: `${__dirname}/src/client/javascripts`,
  entry: {
    app: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/',
  },

  devtool: PROD ? 'source-map' : 'inline-source-map',

  node: {
    fs: 'empty',
  },

  optimization: {
    splitChunks: {
      automaticNameDelimiter: '~',
      cacheGroups: {
        style: {
          test: /vendor\.scss/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
          priority: 1,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
          priority: 1,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            cacheDirectory: './.tmp',
          },
        },
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[name]--[hash:base64:5]',
            },
          },
          'autoprefixer-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'src/client/stylesheets/vendor.scss'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              outputStyle: 'expanded',
              localIdentName: '[local]__[name]--[hash:base64:5]',
            },
          },
          'fast-sass-loader',
          'autoprefixer-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/client/stylesheets/vendor.scss'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false,
              importLoaders: 2,
              outputStyle: 'expanded',
            },
          },
          'fast-sass-loader',
          'autoprefixer-loader',
        ],
      },
    ],
  },
  plugins: [
    new LiveReloadPlugin({ delay: 500 }),
    autoprefixer,
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        context: __dirname,
        debug: true,
        displayErrorDetails: true,
        outputPathinfo: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.CONFIG_ENV': `"${CONFIG_ENV}"`,
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css', chunkFilename: '[name]-[contenthash].css' }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([{ from: '../images', to: 'images' }]),
    new AssetsPlugin({
      path: path.join(__dirname, 'dist', 'public'),
      prettyPrint: true,
    }),
    new HtmlWebpackPlugin({
      template: `!!ejs-compiled-loader!${path.join(__dirname, 'src', 'server', 'templates', 'template-webpack.html')}`,
      filename: 'index.html',
      chunksSortMode: (a, b) => {
        if (a.names[0] === 'vendor') return -1
        if (b.names[0] === 'vendor') return 1

        return 0
      },
    }),
  ],
}

/**
 * @see http://webpack.github.io/docs/configuration.html
 * for webpack configuration options
 */
module.exports = clientConfig
