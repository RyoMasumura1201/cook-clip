import Axios, { AxiosRequestConfig } from 'axios';
import { useNotificationStore } from '@/stores/notifications';

const requestIntercepter = (config: AxiosRequestConfig) => {
  config.headers = { 'Content-Type': 'application/json' };
  return config;
};

export const useAxios = () => {
  const axios = Axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });
  const { addNotificationStore } = useNotificationStore();
  axios.interceptors.request.use(requestIntercepter);
  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const message: string = error.response?.data?.message || error.message;
      addNotificationStore({ type: 'error', message });

      return Promise.reject(error);
    },
  );
  return { axios };
};
