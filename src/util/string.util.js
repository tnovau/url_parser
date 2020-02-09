const isString = str => typeof str === 'string';

/** @param {number} index */
const isInString = index => index !== -1;

const URL_SEPARATOR = '/';
const QUERY_PARAMS_SEPARATOR = '?';
const QUERY_PARAM_SEPARATOR = '&';
const QUERY_PARAM_KEY_VALUE_SEPARATOR = '=';

/** @param {string} url */
const splitUrl = url => url.split(URL_SEPARATOR);

/** @param {string} queryParams */
const splitQueryParamList = queryParams => queryParams.split(QUERY_PARAM_SEPARATOR);

/** @param {string} queryParam */
const splitQueryParamKeyValue = queryParam => queryParam.split(QUERY_PARAM_KEY_VALUE_SEPARATOR);

/** @param {string} url */
const removeUrlQueryParams = url => {
  const indexOfQueryParamSeparator = url.indexOf(QUERY_PARAMS_SEPARATOR);
  return isInString(indexOfQueryParamSeparator)
    ? url.substring(0, indexOfQueryParamSeparator)
    : url;
};

/** @param {string} url */
const getUrlParams = url => {
  const indexOfQueryParamSeparator = url.indexOf(QUERY_PARAMS_SEPARATOR);
  return isInString(indexOfQueryParamSeparator)
    ? url.substring(indexOfQueryParamSeparator + 1)
    : '';
};

module.exports = {
  getUrlParams,
  isString,
  isInString,
  removeUrlQueryParams,
  splitQueryParamKeyValue,
  splitQueryParamList,
  splitUrl,
};
