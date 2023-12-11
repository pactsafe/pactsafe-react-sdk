const { LoaderOptionsPlugin } = require('webpack');
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
        new LoaderOptionsPlugin({
          options: {
            experiments: {
              futureDefaults: true,
            },
          },
        }),
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
