const ROOT_ROUTE = '/';

// Auth Routes
export const AUTH_ROUTE = '/auth';
const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;

export const ADMIN_ROUTES = ['/admin'];
export const USER_ROUTES = ['/user'];

const ROUTES = {
  ROOT_ROUTE,
  AUTH_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  ADMIN_ROUTES,
  USER_ROUTES,
};

export default ROUTES;
