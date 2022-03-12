import Axios, { AxiosRequestConfig } from 'axios';

const requestIntercepter = (config: AxiosRequestConfig) => {
  config.headers = { 'Content-Type': 'application/json' };
  return config;
};

export const axios = Axios.create({});

axios.interceptors.request.use(requestIntercepter);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(error);
  },
);
