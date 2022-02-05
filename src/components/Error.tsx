import { Text } from '@chakra-ui/react';

export const Error: React.VFC = () => {
  return (
    <Text color='red' textAlign='center' p='10' fontSize='large'>
      エラーが発生しました
    </Text>
  );
};
