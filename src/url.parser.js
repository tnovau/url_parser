const {
  getUrlParams,
  isString,
  isInString,
  removeUrlQueryParams,
  splitUrl,
  splitQueryParamKeyValue,
  splitQueryParamList,
} = require('./util/string.util');
const { tryParseIntQueryParamValue } = require('./util/number.util');
const { UrlParserArgumentError } = require('./url.parser.argument.error');

const URL_FORMAT_STRING_ARGUMENT = 'urlFormatString';
const URL_INSTANCE_ARGUMENT = 'urlInstance';

/**
 * @param {string} sentence
 * @param {string} argumentName
 */
const validateArgumentIsString = (sentence, argumentName) => {
  if (!sentence || !isString(sentence))
    throw new UrlParserArgumentError(`${argumentName} should be an string required`);
}

/** @param {string} urlFormatString */
const getSplittedUrlFormatMapper = (urlFormatString) => splitUrl(urlFormatString)
  .reduce((prev, actual, index) => {
    const indexOfKeyStarts = actual.indexOf(':');
    return isInString(indexOfKeyStarts)
      ? [...prev, {
        index,
        key: actual.substr(indexOfKeyStarts + 1),
      }]
      : prev;
  }, []);

/**
 * @param {string} urlFormatString
 * @param {string} urlInstance
 */
const getUrlParsed = (urlFormatString, urlInstance) => {
  /** @type {Array<{index:number, key: string}>} */
  const splittedFormatMapper = getSplittedUrlFormatMapper(urlFormatString);

  const splittedUrlInstanceWithoutQueryParams = splitUrl(removeUrlQueryParams(urlInstance));
  return splittedFormatMapper.reduce((prev, actual) => ({
    ...prev,
    [actual.key]: tryParseIntQueryParamValue(splittedUrlInstanceWithoutQueryParams[actual.index]),
  }), {});
};

/** @param {string} urlInstance */
const getUrlQueryParmsParsed = urlInstance =>
  splitQueryParamList(getUrlParams(urlInstance))
    .map(x => splitQueryParamKeyValue(x))
    .reduce((prev, actual) => ({
        ...prev,
        [actual[0]]: tryParseIntQueryParamValue(actual[1]),
      }), {});

/**
 * @param {string} urlFormatString
 * @param {string} urlInstance
 */
const UrlParser = (urlFormatString, urlInstance) => {
  validateArgumentIsString(urlFormatString, URL_FORMAT_STRING_ARGUMENT);
  validateArgumentIsString(urlInstance, URL_INSTANCE_ARGUMENT);

  const urlParsed = getUrlParsed(urlFormatString, urlInstance);
  const urlParamsParsed = getUrlQueryParmsParsed(urlInstance);

  return {
    ...urlParsed,
    ...urlParamsParsed,
  };
};

module.exports = {
  URL_FORMAT_STRING_ARGUMENT,
  URL_INSTANCE_ARGUMENT,
  UrlParser,
};
