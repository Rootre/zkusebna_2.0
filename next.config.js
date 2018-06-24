const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const path = require('path');
const glob = require('glob');

module.exports = withCss(withSass({
    cssModules: true,
    cssLoaderOptions: {
        localIdentName: "[local]___[hash:base64:5]",
    },
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
            }
        );

        return config;
    }
}));
