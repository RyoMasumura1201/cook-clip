import { memo, useState } from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';
const Search: React.VFC = () => {
  const [searchText, setSearchText] = useState('');
  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };
  return (
    <HStack w={{ base: '90%', md: '70%' }} m='0 auto'>
      <Input value={searchText} onChange={onChangeSearchText} />
      <Button colorScheme='orange'>検索</Button>
    </HStack>
  );
};

export default memo(Search);
