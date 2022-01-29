import { memo } from 'react';
import { Text } from '@chakra-ui/react';
import { Box, Center } from '@chakra-ui/layout';
import { FaGithub } from 'react-icons/fa';

const Footer: React.VFC = () => {
  return (
    <footer>
      <Box bg='black' width='100%' p='2' textAlign='center'>
        <Center>
          <a href='https://github.com/RyoMasumura1201/cook-clip'>
            <Center>
              <FaGithub color='white' size='50' />
            </Center>
            <Text color='gray.100' fontSize='sm'>
              Source Code is here
            </Text>
          </a>
        </Center>
      </Box>
    </footer>
  );
};

export default memo(Footer);
