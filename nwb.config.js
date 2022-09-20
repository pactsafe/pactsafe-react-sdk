const Dotenv = require('dotenv-webpack');
const { version } = require('./package.json');

module.exports = {
  type: 'react-component',
  devServer: {
    https: true,
  },
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
  babel: {
    plugins: [
      ['@babel/plugin-proposal-export-default-from'],
      [
        'search-and-replace',
        {
          rules: [
            {
              search: '_client-version',
              replace: version,
            },
          ],
        },
      ],
    ],
  },
};
