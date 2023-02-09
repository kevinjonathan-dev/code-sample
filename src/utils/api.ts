/**
 * Add GET params to url
 * @param baseUrl
 * @param params
 * @returns
 */
export const addParamsToUrl = (
  baseUrl: string,
  params: { [key: string]: any },
): string => {
  const url = new URLSearchParams();
  // eslint-disable-next-line no-restricted-syntax
  for (const v of Object.entries(params)) {
    url.set(encodeURIComponent(v[0]), encodeURIComponent(v[1]));
  }

  return `${baseUrl}?${url.toString()}`;
};

/**
 * Parse Json Web Token
 * @param token
 * @returns
 */
export function parseJWT(token: string): {
  data: {
    userId: string;
    userName: string;
    userEmail: string;
    access: {
      role: string;
      companyId: string;
    }[];
    lastAssessment?: {
      assessmentId?: string;
      companyId?: string;
      dateCreated?: string;
      status?: string;
    }[];
  };
  iat: number;
  exp: number;
} {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
