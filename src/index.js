const { UrlParser } = require('./url.parser');

console.log(UrlParser(
  '/:version/api/:collection/:id',
  '/6/api/listings/3?sort=desc&limit=10'
));