import { check } from 'k6';
import { getCountriesFail } from '../api/counterparty.js';
import { getTestOptions } from '../utils/getTestOptions.js';
import { handleSummary } from '../utils/summary.js';


export const options = getTestOptions();

export { handleSummary };

export default function () {
  const res = getCountriesFail();

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response is not empty': (r) => r.body && r.body.length > 0,
  });
}