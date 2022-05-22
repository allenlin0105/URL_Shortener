const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: { 
        'assets': '@/assets',
        'components': '@/components',
        //Must use function path.resolve(__dirname, 'public/..'), directly using path takes no effect
        'vendor': path.resolve(__dirname, 'public/vendor'),
      }
    }
  },
  devServer: {
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
  lintOnSave : false
})
