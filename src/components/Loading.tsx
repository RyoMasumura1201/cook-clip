import { Spinner } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

export const Loading: React.VFC = () => {
  return (
    <Box m='0 auto' textAlign='center' p='10'>
      <Spinner size='xl' color='blue.500' emptyColor='gray.200' />
    </Box>
  );
};
