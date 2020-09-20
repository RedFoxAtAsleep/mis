module.exports = {
    // outputDir: '',  // https://cli.vuejs.org/zh/config/https://cli.vuejs.org/zh/config/
    outputDir: 'dist',  // 相对于根目录
    indexPath: 'index.html',  // 相对于outputDir
    assetsDir: 'static',  // 相对于outputDir，js、css、img、fonts
    devServer: {
        proxy: 'http://localhost:9090'
    }
}

