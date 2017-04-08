const baseURL = 'https://httpbin.org/';

function getRequestParams(args) {
  return {
    method: 'GET',
    url: baseURL,
  }
}
exports = getRequestParams;
