const path = require('path')
const glob = require('glob')

module.exports = {
	exportPathMap: function () {
		return {
			'/': {page: '/'},
		}
	},
	webpack: (config, {dev}) => {
		config.module.rules.push(
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				use: 'graphql-tag/loader'
			},
			{
				test: /\.css$/,
				use: 'raw-loader'
			}
		)
		return config
	}
}
