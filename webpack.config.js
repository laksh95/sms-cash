var path = require("path");
var webpack = require('webpack'); 

var DIST_DIR = path.resolve(__dirname+'/client/dist/');
var SRC_DIR = path.resolve(__dirname+'/client/src/');

var config = {

        debug: true,
        devtool: 'cheap-module-eval-source-map',
        noInfo: false,
        entry: [
            'eventsource-polyfill',
            'webpack-hot-middleware/client',
            './client/src/app/index.jsx'
        ],
        target: 'web',
	output: {
		path: DIST_DIR + "/app",
		filename: "index.js",
		publicPath: "/"
	},
          devServer: {
          contentBase: './client/src'
        },

        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
        ],
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

                        {
                                test: /\.js$/,
                                include: SRC_DIR,
                                loaders: ['babel']
                        },
                        {
                                test: /(\.css)$/,
                                loaders: ['style', 'css']
                        }
		]
	}
};

module.exports = config;
