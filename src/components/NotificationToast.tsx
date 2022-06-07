import { Notification } from '@/stores/notifications';
import { useToast } from '@chakra-ui/react';
import { memo } from 'react';

type Props = Notification & {
  dismissNotification: (id: string) => void;
};
const NotificationToast: React.VFC<Props> = (props) => {
  const { id, type, title, message, dismissNotification } = props;
  const toast = useToast();
  return (
    <>
      {toast({
        title,
        description: message,
        status: type,
        duration: 9000,
        isClosable: true,
        position: 'top',
        onCloseComplete: () => dismissNotification(id),
      })}
    </>
  );
};

export default memo(NotificationToast);
