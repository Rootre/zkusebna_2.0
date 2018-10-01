const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withSass({
    cssModules: true, //TODO: figure out how to import non-local css from node_modules
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[folder]_[local]_[hash:base64:5]",
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
        config.module.rules.push(
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: 'react-svg-loader'
            }
        );

        Object.assign(config.resolve.alias, {
            Data: path.resolve(__dirname, 'data'),
            Helpers: path.resolve(__dirname, 'helpers'),
            Components: path.resolve(__dirname, 'components'),
            Sass: path.resolve(__dirname, 'static/sass'),
            Svg: path.resolve(__dirname, 'static/svg'),
        });

        return config;
    }
});
