import http from 'k6/http';
import { getAuthHeaders } from './auth.js';

/**
 * Makes an HTTP request to the specified URL using the given method.
 *
 * @param {string} url - The URL to which the request is sent.
 * @param {string} [method='GET'] - The HTTP method to use for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {Object|null} [body=null] - The body of the request, which will be stringified if provided.
 * @param {Object} [headers=getAuthHeaders()] - The headers to include in the request.
 * @returns {Response} - The HTTP response.
 */
export function callApi(url, method = 'GET', body = null, headers = getAuthHeaders()) {
  const options = {
    headers: headers,
    tags: { name: `${url} ${method}` },
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  let response;

  switch (method.toUpperCase()) {
    case 'POST':
      response = http.post(url, options.body, options);
      break;
    case 'PUT':
      response = http.put(url, options.body, options);
      break;
    case 'DELETE':
      response = http.del(url, options.body, options);
      break;
    default:
      response = http.get(url, options);
  }

  // Log error if status is not 2xx
  if (response.status < 200 || response.status >= 300) {
    console.error(
      `❌ API call failed:\n` +
      `  ➤ URL: ${url}\n` +
      `  ➤ Method: ${method}\n` +
      `  ➤ Status: ${response.status}\n` +
      `  ➤ Response Body: ${response.body}\n`
    );
  }

  return response;
}