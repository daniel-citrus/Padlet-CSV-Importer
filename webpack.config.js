const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (end, argv) => {
    const mode = argv.mode;

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
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader',
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
