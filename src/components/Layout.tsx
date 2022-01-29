import { memo } from 'react';

import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

type Props = {
  children: React.ReactNode;
};
const Layout: React.VFC<Props> = ({ children }) => {
  return (
    <div className='site-wrapper'>
      <SEO />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default memo(Layout);
