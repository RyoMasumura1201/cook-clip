import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { atom } from 'recoil';
import { useRecoilState } from 'recoil';
export type Notification = {
  id: string;
  type: 'success' | 'error';
  title: string;
  message?: string;
};

export const notificationListState = atom<Notification[]>({ key: 'notificationList', default: [] });

export const useNotificationStore = () => {
  const [notificationList, setNotificationList] = useRecoilState(notificationListState);

  const addNotificationStore = useCallback(
    (notification: Omit<Notification, 'id' | 'title'>) => {
      const { type, message } = notification;
      setNotificationList([
        ...notificationList,
        {
          id: nanoid(),
          type,
          title: type,
          message,
        },
      ]);
    },
    [notificationList, setNotificationList],
  );

  return { addNotificationStore };
};
