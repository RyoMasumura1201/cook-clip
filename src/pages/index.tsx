import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';

type Props = {
  items: any;
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
      <p>test</p>
    </Layout>
  );
};

export default Home;
