const BASE_USERS = 50; // Base number of users
const BASE_DURATION_SECONDS = 5; // Base duration in seconds
const STAGE_10_PERCENT = BASE_DURATION_SECONDS * 0.1; // 10% of the base duration

export const testProfiles = {
  smoke: {
    vus: 1, // Virtual users for smoke test
    duration: '5s', // Duration of the smoke test
  },
  load: {
    stages: [
      { duration: `${STAGE_10_PERCENT}s`, target: BASE_USERS }, // Ramp up to base users
      { duration: `${BASE_DURATION_SECONDS}s`, target: BASE_USERS }, // Maintain base users
      { duration: `${STAGE_10_PERCENT}s`, target: 0 }, // Ramp down to 0 users
    ],
  },
  stress: {
    stages: [
      { duration: `${STAGE_10_PERCENT}s`, target: Math.round(BASE_USERS * 1.2) }, // Ramp up to 120% of base users
      { duration: `${BASE_DURATION_SECONDS}s`, target: Math.round(BASE_USERS * 1.2) }, // Maintain 120% of base users
      { duration: `${STAGE_10_PERCENT}s`, target: 0 }, // Ramp down to 0 users
    ],
  },
  spike: {
    stages: [
      { duration: '2m', target: BASE_USERS * 20 }, // Spike to 20 times the base users
      { duration: '1m', target: 0 }, // Ramp down to 0 users
    ],
  },
  soak: {
    stages: [
      { duration: `${STAGE_10_PERCENT}s`, target: BASE_USERS }, // Ramp up to base users
      { duration: '4h', target: BASE_USERS }, // Maintain base users for 4 hours
      { duration: `${STAGE_10_PERCENT}s`, target: 0 }, // Ramp down to 0 users
    ],
  },
};