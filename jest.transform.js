module.exports = require('babel-jest').createTransformer({
  presets: ['env', 'react', 'stage-1'], // update this if we need more preprocessors to run tests in Jest
});
