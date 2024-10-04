const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (end, argv) => {
    // dev_mode : argv.mode

    return {
        entry: './src/index.js',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.csv$/,
                    loader: 'csv-loader',
                    options: {
                        dynamicTyping: true,
                        header: true,
                        skipEmptyLines: true,
                    },
                },
            ],
        },
        output: {
            clean: true,
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Padlet Importer',
                template: './src/template.html',
            }),
            new MiniCssExtractPlugin(),
        ],
    };
};
