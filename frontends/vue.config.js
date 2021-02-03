const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, "../backend/public/"),
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8888/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/login': {
                target: 'http://localhost:3000/api/auth/login',
                changeOrigin: true,
                pathRewrite: {
                    '^/login': ''
                }
            },
            '/cephal': {
                target: 'http://114.70.193.168:8888/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/cephal': ''
                }
            }
        }
    },
    configureWebpack: {
        devServer: {
            host: '0.0.0.0',
            port: '8080'
        }
    }
}