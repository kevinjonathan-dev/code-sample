/* eslint-disable no-param-reassign */

import axios, { AxiosResponse } from 'axios';
import { API_BASE_ENDPOINT, USER_ENDPOINT } from 'constants/api';
import requests from './requests';

export default {
  get: async (accessToken: string): Promise<AxiosResponse<UserType>> => {
    const res = await requests.get(`${USER_ENDPOINT}/`, {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });

    return res;
  },
  update: async (
    accessToken: string,
    userData: UserType,
  ): Promise<AxiosResponse<UserType>> => {
    const res = await axios.put(`${USER_ENDPOINT}/`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return res;
  },
  delete: async (accessToken: string) => {
    const res = await requests.delete(`${USER_ENDPOINT}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return res;
  },
  /** User assessment methods */
  assessment: {
    get: async (
      accessToken: string,
      companyId: string,
    ): Promise<
      AxiosResponse<{
        answers: AssessmentAnswer[];
        demographic: DemographicData;
        results: any;
      }>
    > => {
      const res = await requests.get(
        `${USER_ENDPOINT}/companies/${companyId}/assessment`,
        {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      );

      return res;
    },
    submit: async (
      accessToken: string,
      companyId: string,
      assessment: AssessmentSubmission,
    ) => {
      const res = await requests.post(
        `${USER_ENDPOINT}/companies/${companyId}/assessment`,
        assessment,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return res;
    },
  },
};
