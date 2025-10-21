const config = {
  development: {
    apiUrl: 'http://localhost:8000'
  },
  production: {
    apiUrl: 'https://brand-shop-omega.vercel.app'
  }
};

const environment = import.meta.env.MODE || 'development';

export const apiUrl = config[environment].apiUrl;