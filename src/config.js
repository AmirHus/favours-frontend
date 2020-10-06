export const AUTH0 = {
  CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  AUDIENCE : process.env.REACT_APP_AUTH0_API_IDENTIFIER,
  BASE_URL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
};

export const TOKEN_NAME = 'favour_token';
