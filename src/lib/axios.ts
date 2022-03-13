import Axios, { AxiosRequestConfig } from 'axios';
import { useRecoilState } from 'recoil';
import { notificationListState } from '@/stores/notifications';
import { nanoid } from 'nanoid';

const requestIntercepter = (config: AxiosRequestConfig) => {
  config.headers = { 'Content-Type': 'application/json' };
  return config;
};

export const useAxios = () => {
  const axios = Axios.create({});
  const [notificationList, setNotificationList] = useRecoilState(notificationListState);
  axios.interceptors.request.use(requestIntercepter);
  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const message: string = error.response?.data?.message || error.message;
      setNotificationList([
        ...notificationList,
        {
          id: nanoid(),
          type: 'error',
          title: 'Error',
          message,
        },
      ]);

      return Promise.reject(error);
    },
  );
  return { axios };
};
