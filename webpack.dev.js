const path = require('path');
const PostCSSPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  stats: { colors: true },
  // Eval does not work for css source maps
  // `All values enable source map generation except eval and false value.`
  // https://github.com/webpack-contrib/css-loader
  devtool: 'cheap-module-source-map',
  entry: [
    path.resolve(__dirname, 'src/assets/scripts/index.js'),
    path.resolve(__dirname, 'src/assets/styles/index.scss')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '_site/assets'),
    publicPath: '/assets/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // Will create a `webpack.njk` with the css/jss files
    // that then gets picked up by eleventy
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'webpack.html'),
      filename: path.resolve(__dirname, 'src/_includes/webpack.njk'),
      // Hash is used for cache busting the generated webpack.html
      // while keeping the same file name in the output
      hash: true,
      inject: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [PostCSSPresetEnv]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash].[ext]',
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  }
};
