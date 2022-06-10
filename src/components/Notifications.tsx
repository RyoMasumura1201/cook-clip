import { useRecoilState } from 'recoil';
import { notificationListState } from '@/stores/notifications';
import NotificationToast from './NotificationToast';
import { memo } from 'react';

const Notifications: React.VFC = () => {
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

export default memo(Notifications);
