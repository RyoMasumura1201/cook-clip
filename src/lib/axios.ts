import Axios, { AxiosRequestConfig } from 'axios';
import { useHandleToast } from '@/hooks/useHandleToast';

const requestIntercepter = (config: AxiosRequestConfig) => {
  config.headers = { 'Content-Type': 'application/json' };
  return config;
};

export const useAxios = () => {
  const axios = Axios.create({ baseURL: '/api' });
  const { errorToast } = useHandleToast();

  axios.interceptors.request.use(requestIntercepter);
  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const message: string = error.response?.data?.message || error.message;
      errorToast();

      return Promise.reject(error);
    },
  );
  return { axios };
};
