import '../styles/main.css';
// import normalize.css
import 'normalize.css';

import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';

// import your default seo configuration
import SEO from '../next-seo.config.js';

export default class OverwriteApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    /* The different references to the favicons. */
    const favicon = {
      icon: '/favicon.png'
    };

    return (
      <>
        <Head>
          <link rel="shortcut icon" type="image/x-icon" href={favicon.icon} />
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </>
    );
  }
}
