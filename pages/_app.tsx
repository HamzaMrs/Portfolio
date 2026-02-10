/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import App, { AppContext as NextAppContext, AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Urbanist } from 'next/font/google';

/* -------------------------- Internal Dependecies -------------------------- */

import AppContext from '../components/Utils/context';
import Loader from '../components/Loader';
import {
  loadState,
  clearState,
  saveState,
} from '../components/Utils/localstorage';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

type MyAppState = {
  show: boolean;
  theme: boolean;
};

export default class MyApp extends App<AppProps, {}, MyAppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      show: false,
      theme: loadState() ? true : false,
    };
  }

  loadTheme = () => {
    // Legacy loadTheme kept for compatibility
    const { theme } = this.state;
    if (theme == false) {
      clearState();
    } else {
      saveState(1);
    }
  };

  handleopen = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  setTheme = () => {
    const { theme } = this.state;
    this.setState({ theme: !theme });
  };

  closeShow = () => {
    this.setState({ show: false });
  };

  static async getInitialProps(appContext: NextAppContext) {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider attribute="class">
        <AppContext.Provider
          value={{
            show: this.state.show,
            theme: this.state.theme,
            loadTheme: this.loadTheme,
            setTheme: this.setTheme,
            handleopen: this.handleopen,
            closeShow: this.closeShow,
          }}
        >
          <Loader />
          <div className={urbanist.className}>
            <Component {...pageProps} />
          </div>
        </AppContext.Provider>
      </ThemeProvider>
    );
  }
}
