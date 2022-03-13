import { useRecoilState } from 'recoil';
import { useToast } from '@chakra-ui/react';
import { notificationListState } from '@/stores/notifications';
export const Notifications: React.VFC = () => {
  const toast = useToast();
  const [notificationList, setNotificationList] = useRecoilState(notificationListState);
  return (
    <>
      {notificationList.map(({ title, message, type }) =>
        toast({
          title,
          description: message,
          status: type,
          duration: 9000,
          isClosable: true,
          position: 'top',
        }),
      )}
    </>
  );
};
