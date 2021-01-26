'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

const port = process.env.port || process.env.npm_config_port || 9000 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  transpileDependencies: process.env.NODE_ENV === "development" ? ["*"] : [],//如果不开发ie可以先注释 ， 
  // transpileDependencies: ['node_modules/webpack-dev-server/client'],
  lintOnSave: false,
  filenameHashing: process.env.NODE_ENV !== 'development',
  productionSourceMap: true,
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        // 'swiper':'swiper/dist/js/swiper.js',
      }
    },
    performance: {
      hints:false
    },

    //或者

    //警告 webpack 的性能提示
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 500000000,
      //生成文件的最大体积
      maxAssetSize: 300000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  devServer: {
    open: true,
    // host: '0.0.0.0',
    port: port,
    // https: true,
    // hotOnly: false,
    proxy: {
      '/api': {
        target: "https://dev.deehow.com/",
        changeOrigin: true,
        secure: false,//https
        // pathRewrite: {
        //   "^/api": ""
        // }
      },
      '/notification': {
        target: "https://dev.deehow.com/",
        changeOrigin: true,
        secure: false,//https
        // pathRewrite: {
        //   "^/api": ""
        // }
      },
      '/unauthorized': {
        target: "https://dev.deehow.com/",
        changeOrigin: true,
        secure: false,
        // pathRewrite: {
        //   "^/unauthorized": "/unauthorized"
        // }
      },
      '/qingqiu': {
        target: "http://192.168.1.27:9000/",
        changeOrigin: true,
        secure: false,
      },
      '/getView': {
        target: "http://192.168.1.27:9000/",
        changeOrigin: true,
        secure: false,
      },
    }, // string | Object
    before: app => {}
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload 优化第一次加载
    config.entry.app = ['babel-polyfill', './src/main.js']
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests 单页面无用 , 删掉
    config.plugins.delete('prefetch')
    // set preserveWhitespace 去掉空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 优化第三方 比如ElementUI的打包
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}