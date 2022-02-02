import { memo } from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';
const Search: React.VFC = () => {
  return (
    <HStack w={{ base: '90%', md: '70%' }} m='0 auto'>
      <Input />
      <Button colorScheme='orange'>検索</Button>
    </HStack>
  );
};

export default memo(Search);
