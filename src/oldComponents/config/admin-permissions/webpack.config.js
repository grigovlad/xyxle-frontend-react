switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./webpack.production.config');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./webpack.development.config');
}
