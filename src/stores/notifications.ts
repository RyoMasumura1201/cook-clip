import { atom } from 'recoil';

export type Notification = {
  id: string;
  type: 'success' | 'error';
  title: string;
  message?: string;
};
export const notificationListState = atom<Notification[]>({ key: 'notificationList', default: [] });
