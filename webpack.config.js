var path = require("path");

var DIST_DIR = path.resolve(__dirname+'/client/dist/');
var SRC_DIR = path.resolve(__dirname+'/client/src/');

var config = {
	entry: SRC_DIR + "/app/index.jsx",
	output: {
		path: DIST_DIR + "/app",
		filename: "index.js",
		publicPath: "/"
	},
	devtool : 'source-map',
	module: {
		loaders: [
			{
				test: /\.js?/,
				include: SRC_DIR,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015", "stage-2"]
				}
			}
		]
	}
};

module.exports = config;