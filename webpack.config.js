var path = require("path");
var DIST_DIR = path.resolve(__dirname+'/client/dist/');
var SRC_DIR = path.resolve(__dirname+'/client/src/');

var config = {
  entry: SRC_DIR + "/app/index.jsx",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer:{
    publicPath:'/',
    contentBase:'./client/src',
    port:8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  devtool : 'source-map',
  module: {

        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
           {test: /\.jsx$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
           {test: /(\.css)$/, loaders: ['style', 'css']},
           {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
           {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
           {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
           {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
           {test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192' }
        ]

  }

};
module.exports = config;