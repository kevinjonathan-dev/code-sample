export const API_BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE_ENDPOINT;
export const AUTH_ENDPOINT = `${API_BASE_ENDPOINT}/auth`;
export const USER_ENDPOINT = `${API_BASE_ENDPOINT}/user`;
export const ADMIN_ENDPOINT = `${API_BASE_ENDPOINT}/administrator`;

/** Set default limit and offset for requests */
export const DEFAULT_LIMIT = 100;
export const MAX_LIMIT = 1000;
export const DEFAULT_OFFSET = 0;
