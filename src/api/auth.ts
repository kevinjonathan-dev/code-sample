/* eslint-disable no-param-reassign */

import { API_BASE_ENDPOINT, AUTH_ENDPOINT } from 'constants/api';
import { AxiosResponse } from 'axios';
import requests from './requests';

export default {
  /**
   * Sign up methof
   * @param params
   */
  signUp: async (params = {}) => {
    const res = await requests.post(`${AUTH_ENDPOINT}/signup`, params);

    return res;
  },
  login: async (params = {}) => {
    const res = await requests.post(`${AUTH_ENDPOINT}/login`, params);

    return res;
  },
  token: async (
    params = {},
  ): Promise<AxiosResponse<{ accessToken: string }>> => {
    const res = await requests.post(`${AUTH_ENDPOINT}/token`, params);

    return res;
  },
  logout: async (accessToken: string) => {
    const res = await requests.delete(`${AUTH_ENDPOINT}/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return res;
  },
};
