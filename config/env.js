const environments = {
  test: {
    auth: {
      clientId: 'etuity-core-frontend-web', // Client ID for authentication
      clientSecret: __ENV.CLIENT_SECRET || '', // Use env var
      tokenUrl: 'https://test-login.etuity.no/ade8c63f/connect/token', // URL to obtain the token
      scope: 'regions' // Scope of the access
    },
    baseUrl: 'https://test-norclub.etuity.no', // Base URL for the environment
    backendUrl: 'https://regions-integration-api.test.internal.etuity.no' // URL for backend API 
  }
};

const selectedEnv = __ENV.ENVIRONMENT || 'test'; // Default to 'test' if not set

export const config = environments[selectedEnv]; // Export the configuration for the selected environment