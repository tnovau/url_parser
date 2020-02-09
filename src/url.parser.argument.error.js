function UrlParserArgumentError(message) {
  this.name = 'UrlParserArgumentError';
  this.message = message;
}

UrlParserArgumentError.prototype = new Error;

module.exports = {
  UrlParserArgumentError,
};
