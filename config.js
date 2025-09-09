// API Configuration
// Update this file with your deployed backend URL

const config = {
  // Development API URL
  development: 'http://localhost:8000',
  
  // Production API URL - Replace with your actual deployed backend URL
  production: 'https://analytiq-production.up.railway.app/',
  
  // Get current environment
  getApiUrl: () => {
    const env = import.meta.env.MODE || 'development';
    return config[env] || config.development;
  }
};

export default config;
