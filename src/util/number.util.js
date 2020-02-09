const tryParseIntQueryParamValue = value => {
  const result = parseInt(value, 10);
  return isNaN(result) ? value : result;
}

module.exports = {
  tryParseIntQueryParamValue,
};
