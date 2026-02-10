/* -------------------------------------------------------------------------- */
/*                            External Dependecies                            */
/* -------------------------------------------------------------------------- */
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ScoutBar } from 'scoutbar';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

/* -------------------------- Internal Dependencies ------------------------- */
import Navbar from '../Navbar';
import AppContext from '../Utils/context';
import { initGA, logPageView } from '../Utils/analytics';
import Cursor from '../Cursor';
import SkipToMain from '../A11y/skip-to-main';
import ChatBot from '../ChatBot/index';
import Footer from '../Footer';

import { BackLay, BodyStyling, Main } from './style';
import { actions } from './data';
import Head from 'next/head';

const Layout: React.FC<PropsWithChildren<{
  title?: string;
}>> = ({ children, title = 'Home' }) => {
  const { theme, loadTheme, show, setTheme } = useContext(AppContext);
  const [skew, setSkew] = useState(10);
  const router = useRouter();

  // Exécuté une seule fois au mount
  useEffect(() => {
    // Google Analytics init
    if (typeof window !== 'undefined' && !(window as any).GA_INITIALIZED) {
      initGA();
      (window as any).GA_INITIALIZED = true;
    }
    logPageView();
    loadTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // Volontairement vide: on veut exécuter une seule fois au mount

  return (
    <Main>
      <BodyStyling theme={theme} />
      <Head>
        <title>{`${title} | Hamza Mars | Portfolio`}</title>
        <meta
          name="msapplication-TileColor"
          content={`${theme ? '#000000' : '#FFFFFF'}`}
        />
        <meta name="theme-color" content={`${theme ? '#000000' : '#FFFFFF'}`} />
      </Head>
      <SkipToMain content="main-content" />
      <Navbar />
      <BackLay title={title}>
        <h1 aria-hidden="true">
          {title === 'Home' ? 'HM.' : title.concat('.')}
        </h1>
      </BackLay>
      <Cursor />
      <ChatBot />
      <ScoutBar actions={actions(setTheme)} brandColor="var(--cw)" />
      {!show && (
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
            <Footer />
          </motion.div>
        </AnimatePresence>
      )}
    </Main>
  );
};

export const PageWrapper: React.FC<PropsWithChildren<{}> &
  React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <section {...rest} id="main-content">
      <div className={`container  ${className}`}>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-10">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
