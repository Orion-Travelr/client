const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const currentPath = path.join(__dirname);
const envPath = currentPath + '/.env';
const fileEnv = dotenv.config({ path: envPath }).parsed;
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});


module.exports = {
  mode: "development",
  entry: ['./src/main.tsx'],
  output: {
    path: path.join(__dirname, '/dist/js'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve('./src/')
    },
    extensions: ['.js', '.tsx', '.ts', '.tx', '.jsx', '.json'],
  },
  watchOptions: {
    ignored: [
      '/node_modules/',
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
  ]
};
