import { memo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

type Props = {
  isHome?: boolean;
  children: React.ReactNode;
};
const Layout: React.VFC<Props> = ({ children, isHome }) => {
  return (
    <div className='site-wrapper'>
      <SEO />
      <Header isHome={isHome} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default memo(Layout);
