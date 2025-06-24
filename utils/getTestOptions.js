import { testProfiles } from '../config/k6Options.js';

/**
 * Returns the k6 test options based on the `profile` passed via environment.
 * Defaults to 'smoke' if not set or invalid.
 */
export function getTestOptions() {
  const profile = __ENV.profile || 'smoke';

  if (!testProfiles[profile]) {
    throw new Error(
      `Invalid profile "${profile}". Valid options: ${Object.keys(testProfiles).join(', ')}`
    );
  }

  return testProfiles[profile];
}