const { useBabelRc, override } = require('customize-cra');
const { alias } = require('react-app-rewire-alias');

module.exports = override(
  useBabelRc(),
  alias({
    '@': 'src'
  })
);
