const dev = require('./webpack.dev.js');
const WebpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = WebpackMerge.merge(dev, {
  mode: 'production',
  devtool: 'source-map',
  stats: { colors: true, preset: 'minimal', performance: true },
  output: { filename: '[name].[contenthash].js' },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { map: true }
      })
    ]
  }
});
