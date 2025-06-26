// config/env.js
import { getModuleBaseUrl } from '../utils/envHelpers.js';

const environments = {
  test: {
    bff: {
      baseUrl: 'https://test-norclub.etuity.no',
    },
    backend: {
      regionsBaseUrl: 'https://regions-integration-api.test.internal.etuity.no',
      accountingBaseUrl: 'https://accounting-api.test.internal.etuity.no',
      counterpartyBaseUrl: 'https://counterparty-api.test.internal.etuity.no',
    },
    auth: {
      clientId: 'etuity-core-frontend-web',
      clientSecret: __ENV.CLIENT_SECRET || '',
      tokenUrl: 'https://test-login.etuity.no/ade8c63f/connect/token',
      scope: 'regions accounting:read counterparty:read',
    },
  },
};

const selectedEnv = __ENV.ENVIRONMENT || 'test';
const testType = __ENV.TEST || 'bff';

const env = environments[selectedEnv];

if (!env || !env[testType]) {
  throw new Error(`Invalid ENVIRONMENT ('${selectedEnv}') or TEST ('${testType}') value.`);
}

export const config = env;
export const ACCOUNTING_BASE_URL = getModuleBaseUrl(env, testType, 'accounting', 'accounting');
export const COUNTERPARTY_BASE_URL = getModuleBaseUrl(env, testType, 'counterparty', 'counterparty');
export const REGIONS_BASE_URL = getModuleBaseUrl(env, testType, 'regions', 'counterparty');