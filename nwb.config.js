const Dotenv = require('dotenv-webpack');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'PSReactSDK',
      externals: {
        react: 'React',
      },
    },
  },
  webpack: {
    extra: {
      plugins: [
        new Dotenv(),
      ],
    },
  },
};
