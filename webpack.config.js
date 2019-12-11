var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	plugins: [
		new <u>CopyWebpackPlugin</u>([
			{
				from: "node_modules/amcharts3/amcharts/images",
				to: "amcharts/images"
			}
		])
	]
};
