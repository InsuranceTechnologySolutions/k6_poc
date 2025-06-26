export function getModuleBaseUrl(env, testType, backendModuleName, frontendModuleName) {
    if (testType === 'bff') {
      return `${env.bff.baseUrl}/bff/${frontendModuleName}-module/api/v1.0`;
    }
  
    const key = `${backendModuleName}BaseUrl`; // e.g. accountingBaseUrl
    const baseUrl = env.backend[key];
  
    if (!baseUrl) {
      throw new Error(`Missing backend base URL for module: '${backendModuleName}'`);
    }
  
    return `${baseUrl}/api/v1.0`;
  }