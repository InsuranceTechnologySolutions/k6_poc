import { convertBooleanToPascalCaseString } from '../utils/commonUtils.js';
import { callApi } from '../utils/callApi.js';
import { COUNTERPARTY_BASE_URL } from '../config/env.js';
import { REGIONS_BASE_URL } from '../config/env.js';


/**
 * Fetches a list of organizations based on their external status.
 * @param {boolean} isExternal - Indicates whether the organizations are external.
 * @returns {Promise} - API response.
 */
export function getOrganizations(isExternal) {
  // Validate the 'isExternal' parameter
  if (isExternal === undefined) {
    throw new Error(`'isExternal' parameter is required for type '${type}'`);
  }

  if (typeof isExternal !== 'boolean') {
    throw new Error(`'isExternal' must be a boolean for type '${type}'`);
  }

  // Convert boolean to PascalCase string (e.g., true -> 'True', false -> 'False')
  const isExternalParam = convertBooleanToPascalCaseString(isExternal);

  // Construct the URL for the API call
  const url = `${COUNTERPARTY_BASE_URL}/organizations?pageNumber=1&pageSize=30&external=${isExternalParam}`;

  // Make the API call and return the response
  return callApi(url);
}

export function getOrganizationTypes() {
  const url = `${COUNTERPARTY_BASE_URL}/organizations/types`;

  return callApi(url);
}

export function getCountries() {
  const url = `${REGIONS_BASE_URL}/countries`;

  return callApi(url);
}


export function getCountriesFail() {
  const url = `${REGIONS_BASE_URL}/countrie`;

  return callApi(url);
}