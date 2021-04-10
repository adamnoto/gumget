const { resolve } = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  entry: {
    widget: ['./src/widget.ts']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin(),],
  };
} else {
  config.devServer = {
    port: 9000,
    open: true,
    hot: true,
    compress: true,
    stats: 'errors-only',
    overlay: true,
  };
}

module.exports = config;
