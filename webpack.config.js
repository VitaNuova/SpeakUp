'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {

   entry: {
       'vendor': ['angular'],
       'app': path.resolve(__dirname, 'frontend/src/app.js')
   },

   output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'scripts/[name].js'
   },

   plugins: [
       new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'vendor']
       })
   ]
};