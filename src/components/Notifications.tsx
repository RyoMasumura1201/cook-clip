import { useRecoilState } from 'recoil';
import { useToast } from '@chakra-ui/react';
import { notificationListState } from '@/stores/notifications';
import { NotificationToast } from './NotificationToast';
export const Notifications: React.VFC = () => {
  const toast = useToast();
  const [notificationList, setNotificationList] = useRecoilState(notificationListState);

  const dismissNotification = (id: string) => {
    setNotificationList(notificationList.filter((notification) => notification.id !== id));
  };
  return (
    <>
      {notificationList.map(({ id, title, message, type }) => (
        <NotificationToast
          key={id}
          id={id}
          title={title}
          type={type}
          message={message}
          dismissNotification={dismissNotification}
        />
      ))}
    </>
  );
};
