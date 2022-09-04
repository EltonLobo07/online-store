const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        assetModuleFilename: "[name][ext]",
        path: path.resolve(__dirname, "public")
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.js/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
		        test: /\.css$/i,
		        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
		    },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
	    static: path.resolve(__dirname, "public"),
	    compress: true,
	    port: 3000,
        historyApiFallback: true
  	},
    devtool: "source-map"
};
