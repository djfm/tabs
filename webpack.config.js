require("babel-polyfill");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var jsLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel'
};

var publicPath = path.join(__dirname, "build", "public");

module.exports = [{
    entry: "./server.js",
    target: "node",
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        "path": publicPath,
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
        "path": publicPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            jsLoader,
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap!sass?sourceMap")
            },
            {
                test: /\.(eot|woff2?|ttf)$/,
                loader: 'file'
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
},{
    entry: "./serviceWorker.js",
    target: "web",
    output: {
        "path": publicPath,
        filename: "serviceWorker.js"
    },
    module: {
        loaders: [
            jsLoader
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ""]
    },
    devtool: "sourcemap"
}];
