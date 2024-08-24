const { parseArgs } = require('node:util');

const { values } = parseArgs({
  options: {
    data: {
      type: 'string',
      short: 'd',
    },
    policy: {
      type: 'string',
      short: 'p',
    },
    nodeport:{
      type: 'string',
      default: '3000'
    },
    cedarport: {
      type: 'string',
      default: '3001'
    }
  },
});

module.exports = {
  ...values
};