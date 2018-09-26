const path = require('path');
const bs = require('browser-sync').create();
const webpackDevMiddleware = require('webpack-dev-middleware');
const stripAnsi = require('strip-ansi');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config.base.js');
const compiler = webpack(webpackConfig);
const definedPathReg = /^\/(api|assets|backend|auth)/;

bs.init({
    logFileChanges: false,
    proxy: 'localhost:9000',
    online: false,
    serveStatic: [
        {
            route: '/public/assets',
            dir: path.join(__dirname, '../client/assets')
        }
    ],
    ws: true,
    middleware: [
        webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            noInfo: false,
            stats: {
                colors: true,
                timings: true,
                chunks: false
            },
            // ejs文件直接落盘
            writeToDisk: filePath => /\.ejs$/.test(filePath),
        })
    ],
    plugins: ['bs-fullscreen-message']
});

// 在webpack打包完成后，刷新所有设备
// 如果有错误，则发送错误
compiler.hooks.done.tap('webpack-compile-done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return bs.sockets.emit('fullscreen:message', {
            title: 'Webpack Error:',
            body: stripAnsi(stats.toString()),
            timeout: 100000
        });
    }

    bs.reload();
});
