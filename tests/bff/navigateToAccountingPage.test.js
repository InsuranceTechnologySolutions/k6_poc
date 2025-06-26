/**
 * Scenario: Navigate to Accounting Client Premium Page
 * Description:
 *   Simulates loading the Accounting Client Premium page by calling supporting bff GET endpoints.
 */

import { getPremium } from '../../api/bff/accounting.js';
import { callAndCheck } from '../../utils/checkApi.js';
import { getTestOptions } from '../../utils/getTestOptions.js';
import { handleSummary } from '../../utils/summary.js';

export const options = getTestOptions();

export { handleSummary };

export default function () {
  callAndCheck(() => getPremium('client-funds'), 200); 
  callAndCheck(() => getPremium('client-premium', false), 200); 
  callAndCheck(() => getPremium('client-premium', true), 200); 
  callAndCheck(() => getPremium('insurer-premium', false), 200); 
  callAndCheck(() => getPremium('insurer-premium', true), 200); 
  callAndCheck(() => getPremium('own-premium', false), 200); 
  callAndCheck(() => getPremium('commission'), 200); 
}