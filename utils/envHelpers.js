export function getModuleBaseUrl(env, testType, moduleName) {
    if (testType === 'bff') {
      return `${env.bff.baseUrl}/bff/${moduleName}-module/api/v1.0`;
    }
  
    const key = `${moduleName}BaseUrl`; // e.g. accountingBaseUrl
    const baseUrl = env.backend[key];
  
    if (!baseUrl) {
      throw new Error(`Missing backend base URL for module: '${moduleName}'`);
    }
  
    return `${baseUrl}/api/v1.0`;
  }