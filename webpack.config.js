const path = require('path')

const SRC = path.resolve(__dirname,'src')
const OUT = path.resolve(__dirname,'build')

module.exports = {
    entry: './src/tokens.js',
    target: 'node',
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }]
    },
    resolve: {
        extensions: ['*','.js']
    },
    output: {
        path: `${OUT}`,
        filename: `[name]/[name].js`,
        library: `[name]`,
        libraryTarget: 'umd',
    },
}