import { config } from '../../../config/env.js';
import { callApi } from '../../../utils/callApi.js';

/**
 * Fetches a list of countries from the counterparty module API.
 * @returns {Promise} - API response containing the list of countries.
 */
export function getCountries() {
  // Construct the URL for the API call
  console.log('NODE ENV CLIENT_SECRET:', __ENV.CLIENT_SECRET);
  const url = `${config.backendUrl}/api/v1.0/Countries`;

  // Make the API call and return the response
  return callApi(url);
}