import { check } from 'k6';

/**
 * Call an API function, check the status, log the result, and return the response
 * @param {Function} apiFunc - A function that returns an HTTP response
 * @param {number} expectedStatus - The expected HTTP status code (default: 200)
 * @returns {*} The HTTP response
 */
export function callAndCheck(apiFunc, expectedStatus = 200) {
  const res = apiFunc();

  const passed = check(res, {
    [`Status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
  });

  // Log details if check failed
  if (!passed) {
    console.error('❌ Request failed:');
    console.error(`→ Status: ${res.status}`);
    console.error(`→ Body: ${res.body}`);
    console.error(`→ URL: ${res.url}`);
  }

  return res;
}