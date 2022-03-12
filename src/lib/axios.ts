import Axios, { AxiosRequestConfig } from 'axios';
import { useRecoilState } from 'recoil';
import { notificationListState } from '@/stores/notifications';
import { nanoid } from 'nanoid';

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
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const message: string = error.response?.data?.message || error.message;
    setNotificationList([
      ...notificationList,
      { id: nanoid(), type: 'error', title: 'Error', message },
    ]);

    return Promise.reject(error);
  },
);
