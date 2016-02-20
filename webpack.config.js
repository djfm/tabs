require("babel-polyfill");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var jsLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel'
};


module.exports = [{
    entry: "./server.js",
    target: "node",
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        "path": path.join(__dirname, "build"),
        filename: "server.js"
    },
    externals: {
        express: "commonjs express"
    },
    module: {
        loaders: [jsLoader]
    },
    resolve: {
        extensions: [".js", ".jsx", ""]
    }
},{
    entry: "./client.jsx",
    target: "web",
    output: {
        "path": path.join(__dirname, "build", "public"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            jsLoader,
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap!sass?sourceMap")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css")
    ],
    resolve: {
        extensions: [".js", ".jsx", ""]
    },
    devtool: "sourcemap"
}];
