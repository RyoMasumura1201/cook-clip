import { atom } from 'recoil';
import { useRecoilState, selector } from 'recoil';
export type Notification = {
  id: string;
  type: 'success' | 'error';
  title: string;
  message?: string;
};
export const notificationListState = atom<Notification[]>({ key: 'notificationList', default: [] });
