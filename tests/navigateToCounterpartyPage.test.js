/**
 * Scenario: Navigate to Counterparty Page
 * Description:
 *   Simulates loading the Counterparty page by calling supporting bff GET endpoints.
 *   Verifies they return 200 OK under light load.
 */

import { getOrganizations, getCountries } from '../api/counterparty.js';
import { callAndCheck } from '../utils/checkApi.js';
import { getTestOptions } from '../utils/getTestOptions.js';
import { handleSummary } from '../utils/summary.js';

export const options = getTestOptions();

export { handleSummary };

export default function () {
  callAndCheck(getCountries, 200);
  callAndCheck(() => getOrganizations(false), 200); 
  callAndCheck(() => getOrganizations(true), 200);
}