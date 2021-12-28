const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssWebpackPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './js/main.js',
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: './js/[contenthash].bundle.js',
		assetModuleFilename: './assets/images/[name][contenthash][ext]',
		clean: true,
	},
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /\.m?js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use: [MiniCssWebpackPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|webp|svg)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: './assets/fonts/[name][contenthash][ext]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			filename: './index.html',
			template: '../public/index.html',
		}),
		new MiniCssWebpackPlugin({
			filename: './styles/[name].[contenthash].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'assets/images'),
					to: './assets/images',
				},
				{
					from: path.resolve(__dirname, 'src', 'assets/favicon'),
					to: './assets/favicon',
				},
			],
		}),
		new DotEnv(),
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
};
