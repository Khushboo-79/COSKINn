// Environment configuration
// In development, this points to your local machine IP. 
// In production (release APK), it points to your live server.

export const Config = {
  API_URL: __DEV__ ? 'http://192.168.29.100:3000/api' : 'https://api.fairenne.com/api',
  APP_NAME: 'FAIRENNE',
  VERSION: '1.0.0',
};
