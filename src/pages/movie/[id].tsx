import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { YoutubeMovie } from '../../../type';
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      'UCW01sMEVYQdhcvkrhbxdBpw' + //リュウジさんのchannelId
      '&maxResults=10' +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
  );
  const items = await res.json();

  const paths = items.map((item: YoutubeMovie) => ({
    params: { id: item.id.videoId },
  }));

  return { paths, fallback: true };
};
