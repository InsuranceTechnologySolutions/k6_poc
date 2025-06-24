import { config } from '../config/env.js';
import http from 'k6/http';

let cachedToken = null;

/**
 * Retrieves the access token for authentication.
 * 
 * This function checks if a cached token is available. If so, it returns the cached token.
 * If not, it constructs a payload with the necessary credentials and makes a POST request
 * to the authentication API to obtain a new access token. If the request fails, an error
 * is thrown with the status and response body.
 * 
 * @returns {string} The access token.
 * @throws {Error} Throws an error if the authentication request fails.
 */
export function getAccessToken() {
  if (cachedToken) {
    return cachedToken;
  }

  const payload = {
    grant_type: 'client_credentials',
    client_id: config.auth.clientId,
    client_secret: config.auth.clientSecret,
    scope: config.auth.scope,
  };

  const encodedBody = Object.entries(payload)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const res = http.post(config.auth.tokenUrl, encodedBody, { headers });

  if (res.status !== 200) {
    throw new Error(`Auth failed: ${res.status} ${res.body}`);
  }

  cachedToken = JSON.parse(res.body).access_token;
  return cachedToken;
}

/**
 * Generates authentication headers for HTTP requests.
 *
 * @throws {Error} Throws an error if the COOKIE_HEADER environment variable is not set.
 * @returns {Object} An object containing the Cookie and Content-Type headers.
 */
export function getAuthHeaders() {
  const cookie = __ENV.COOKIE_HEADER;

  if (cookie) {
    return {
      Cookie: cookie,
      'Content-Type': 'application/json',
    };
  }

  const token = getAccessToken?.();
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  throw new Error('No valid authentication method found. Set COOKIE_HEADER or implement getAccessToken().');
}