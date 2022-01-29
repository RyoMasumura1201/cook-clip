import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';

type Props = {
  data: any;
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      'UCW01sMEVYQdhcvkrhbxdBpw' + //リュウジさんのchannelId
      '&key=' +
      process.env.YOUTUBE_API_KEY,
  );
  const data = await res.json();
  return {
    props: { data },
  };
};

const Home: NextPage<Props> = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <p>test</p>
    </Layout>
  );
};

export default Home;
