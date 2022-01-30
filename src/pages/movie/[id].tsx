import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Text } from '@chakra-ui/react';

export default function MoviePage() {
  const router = useRouter();
  const id = router.query.id;
  return (
    <Layout>
      <Text>Post: {id}</Text>
    </Layout>
  );
}
