import { config } from '../../config/env.js';
import { convertBooleanToPascalCaseString } from '../../utils/commonUtils.js';
import { callApi } from '../../utils/callApi.js';

// Base URL for the accounting module API
const ACCOUNTING_BASE_URL = `${config.baseUrl}/bff/accounting-module/api/v1.0`;

/**
 * Fetches premium data based on the type and payment status.
 * @param {string} type - The type of premium (e.g., 'own-premium', 'client-funds', etc.).
 * @param {boolean} isPaid - Indicates whether the premium is paid (required for certain types).
 * @returns {Promise} - API response.
 */
export function getPremium(type, isPaid) {
  // List of valid premium types
  const validTypes = ['own-premium', 'client-funds', 'client-premium', 'insurer-premium', 'commission'];
  // Types that do not require the 'isPaid' parameter
  const typesWithoutIsPaid = ['commission', 'client-funds'];

  // Validate the 'type' parameter
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid type: ${type}. Valid types are: ${validTypes.join(', ')}`);
  }

  let url;

  // Special case for client-funds (different endpoint entirely)
  if (type === 'client-funds') {
    url = `${ACCOUNTING_BASE_URL}/client-funds?pageSize=90&types=Premium`;
  } else {
    url = `${ACCOUNTING_BASE_URL}/accounting/accounts/${type}?pageSize=90`;

    // Add isPaid param only if needed
    if (!typesWithoutIsPaid.includes(type)) {
      if (isPaid === undefined) {
        throw new Error(`'isPaid' parameter is required for type '${type}'`);
      }
      if (typeof isPaid !== 'boolean') {
        throw new Error(`'isPaid' must be a boolean for type '${type}'`);
      }

      const isPaidParam = convertBooleanToPascalCaseString(isPaid);
      url += `&isPaid=${isPaidParam}`;
    }
  }

  return callApi(url);
}
