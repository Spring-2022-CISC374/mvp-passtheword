const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const JavaScriptObfuscator = require('webpack-obfuscator');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const package = require('../package.json');

const RECOMMENDED_MAXIMUM_FILE_SIZE = 50 * 1024 * 1024; // 5mb
//const EGDD_FILE = "egdd.md";

function copyResolver() {
    return (err) => {
        if (err) throw err;
        console.log.apply(null, arguments);
    };
}

module.exports = (env) => {
    // Get game name from Manifest
    let gameUrl = package.game.url; //process.env.npm_package_name;
    // Get endpoint
    let endpoint = env.endpoint;

    directory = path.resolve(__dirname, '..', 'dist', endpoint);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
        console.log('Created dist folder');
    }

    // Copy EGDD to appropriate endpoint
    // fs.copyFileSync(path.resolve(__dirname, '..', EGDD_FILE),
    //     path.resolve(__dirname, '..', 'dist', endpoint, EGDD_FILE),
    //     copyResolver("Copied", EGDD_FILE));

    // Update the index file for the dist directory
    fs.copyFileSync(path.resolve(__dirname, 'index.html'),
        path.resolve(__dirname, '..', 'dist', 'index.html'));

    // Update Manifest file
    manifestFile = path.resolve(__dirname, 'pwa', 'manifest.json');
    const manifest = require(manifestFile);
    manifest.short_name = package.game.shortName;
    manifest.name = package.game.name;
    fs.writeFile(manifestFile, JSON.stringify(manifest),
        copyResolver("Manifest.json was updated"));

    // Build the actual folder of contents
    let ghpages = {
        mode: 'production',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        filename: 'gen.[name].[contenthash].bundle.js'
                    }
                }
            }
        },
        performance: {
            maxEntrypointSize: RECOMMENDED_MAXIMUM_FILE_SIZE,
            maxAssetSize: RECOMMENDED_MAXIMUM_FILE_SIZE
        },
        output: {
            path: path.resolve(__dirname, `../dist/${endpoint}`),
            publicPath: `/${gameUrl}/${endpoint}`,
            filename: 'gen.[name].[contenthash].bundle.js',
            chunkFilename: 'gen.[name].[contenthash].chunk.js'
        },
        plugins: [
            new CleanWebpackPlugin([`dist/${endpoint}/*.js`], {
                root: path.resolve(__dirname, '../')
            }),
            new JavaScriptObfuscator(
                {
                    rotateStringArray: true,
                    stringArray: true,
                    // stringArrayEncoding: 'base64', // disabled by default
                    stringArrayThreshold: 0.75
                },
                ['vendors.*.js']
            )
        ]
    };
    return merge(common, ghpages);
};
