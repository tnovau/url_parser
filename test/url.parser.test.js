const { should } = require('chai');

const {
  URL_FORMAT_STRING_ARGUMENT,
  URL_INSTANCE_ARGUMENT,
  UrlParser
} = require('../src/url.parser');
const { UrlParserArgumentError } = require('../src/url.parser.argument.error');

should();

describe(UrlParser.name, () => {
  describe('Argument validations', () => {
    const validateArgumentTest = (urlFormatString, urlInstance) => {
      try {
        UrlParser(urlFormatString, urlInstance);
      } catch (error) {
        error.should.instanceOf(UrlParserArgumentError);
      }
    };

    it(`should validate ${URL_FORMAT_STRING_ARGUMENT} is a string`, () => {
      validateArgumentTest(12, '/6/api/listings/3?sort=desc&limit=10');
    });

    it(`should validate ${URL_INSTANCE_ARGUMENT} is a string`, () => {
      validateArgumentTest('/:version/api/:collection/:id', 12);
    });

    it(`should validate ${URL_FORMAT_STRING_ARGUMENT} is a required string`, () => {
      validateArgumentTest('', '/6/api/listings/3?sort=desc&limit=10');
    });
  });

  it('should parse url + queryParams', () => {
    const urlParsed = UrlParser(
      '/:version/api/:collection/:id',
      '/6/api/listings/3?sort=desc&limit=10'
    );

    urlParsed.version.should.equal(6);
    urlParsed.collection.should.equal('listings');
    urlParsed.id.should.equal(3);
    urlParsed.sort.should.equal('desc');
    urlParsed.limit.should.equal(10);
  });

  it('should parse url without queryParams', () => {
    const urlParsed = UrlParser(
      '/:version/api/:collection/:id',
      '/6/api/listings/3'
    );

    urlParsed.version.should.equal(6);
    urlParsed.collection.should.equal('listings');
    urlParsed.id.should.equal(3);
  });
});