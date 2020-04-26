'use strict';

var spec = {
  name: 'P2P',
  message: 'Internal Error on stashcore-p2p Module {0}'
};

module.exports = require('@stashcore/stashcore-lib').errors.extend(spec);
