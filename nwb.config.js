module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'PSReactSDK',
      externals: {
        react: 'React'
      }
    }
  }
}
