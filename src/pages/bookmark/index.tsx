import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '@/components/Layout';
import { Text } from '@chakra-ui/react';
const Bookmark: NextPage = () => {
  return (
    <Layout>
      <Text>Bookmark</Text>
    </Layout>
  );
};

export default Bookmark;
