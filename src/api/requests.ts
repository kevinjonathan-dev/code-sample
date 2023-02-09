/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import axios from 'axios';
import { isObjectEmpty } from 'utils/format';
import { API_BASE_ENDPOINT } from 'constants/api';

/** List of default headers */
export const deafultHeaders = {
  jsonRequest: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  multipartRequest: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
};

/** Default requests */
const requests = {
  get: async (url: string, headers = {}) => {
    try {
      if (isObjectEmpty(headers)) {
        headers = deafultHeaders.jsonRequest;
      }
      const result = await axios.get(url, { headers });

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  post: async (url: string, params = {}, headers = {}) => {
    try {
      if (isObjectEmpty(headers)) {
        headers = deafultHeaders.jsonRequest;
      }
      const result = await axios.post(url, params, headers);

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  put: async (url: string, params = {}, headers = {}) => {
    try {
      if (isObjectEmpty(headers)) {
        headers = deafultHeaders.jsonRequest;
      }
      const result = await axios.put(url, params, headers);

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  delete: async (url: string, headers = {}) => {
    try {
      if (isObjectEmpty(headers)) {
        headers = deafultHeaders.jsonRequest;
      }
      const result = await axios.delete(url, headers);

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

export default requests;
