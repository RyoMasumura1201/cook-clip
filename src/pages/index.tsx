import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Movie from '../components/Movie';
import { YoutubeMovie } from '../../type';
import { Wrap, WrapItem } from '@chakra-ui/react';

type Props = {
  items: YoutubeMovie[];
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      'UCW01sMEVYQdhcvkrhbxdBpw' + //リュウジさんのchannelId
      '&maxResults=50' +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
  );
  const data = await res.json();
  const items = data.items;
  return {
    props: { items },
  };
};

const Home: NextPage<Props> = ({ items }) => {
  console.log(items);
  return (
    <Layout>
      <Wrap justify='center' mt='4'>
        {items.map((item: YoutubeMovie) => (
          <WrapItem key={item.id.videoId}>
            <Movie video={item} />
          </WrapItem>
        ))}
      </Wrap>
    </Layout>
  );
};

export default Home;
