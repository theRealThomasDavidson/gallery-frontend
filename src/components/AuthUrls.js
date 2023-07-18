export const AUTH_SERVER_URL = 'https://auth.thomasdavidson.gallery/auth';
//export const AUTH_SERVER_URL = 'http://127.0.0.1:5000/auth';
export const REGISTER_REQUEST = {
    url: `${AUTH_SERVER_URL}/register`,
    method: 'POST',
  };
export const LOGIN_REQUEST = {
    url: `${AUTH_SERVER_URL}/login`,
    method: 'POST',
  };
export const LOGOUT_REQUEST = {
    url: `${AUTH_SERVER_URL}/logout`,
    method: 'POST',
  };
export const VERIFY_REQUEST = {
    url: `${AUTH_SERVER_URL}/verify`,
    method: 'GET',
  };
export const LOGIN_REQUEST_CHALLENGE = {
  url: `${AUTH_SERVER_URL}/login/challenge`,
  method: 'POST',
};
export const LOGIN_REQUEST_ANSWER = {
  url: `${AUTH_SERVER_URL}/login/answer`,
  method: 'POST',
};