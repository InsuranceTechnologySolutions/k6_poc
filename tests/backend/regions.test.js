import { check } from 'k6';
import { getCountries } from '../../api/backend/regions/countries.js';
import { getTestOptions } from '../../utils/getTestOptions.js';

export const options = getTestOptions();

export default function () {
  const res = getCountries();

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response is not empty': (r) => r.body && r.body.length > 0,
  });
}