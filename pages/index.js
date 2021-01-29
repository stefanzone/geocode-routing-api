import Head from 'next/head';
import { useRouter } from 'next/router';

import Code from '../components/Code/Code';
import Layout from '../components/Layout/Layout';
import ExternalLink from '../components/Link/ExternalLink/ExternalLink';

function HomePage() {
  const router = useRouter();

  const title = 'GeoCode Routing API';
  const description = 'The GeoCode Routing API is a service that calculates directions between locations.';
  const canonical = 'https://geocode.dev.stefan.zone' + router.pathname;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta itemProp="name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <Layout>
        <h1>GeoCode Routing API</h1>
        <p>
          The GeoCode Routing API is a service that calculates directions between locations. You can
          search for directions for different modes of transport, such as public transport, car,
          walking or cycling.
        </p>
        <p>
          The project will be made freely available on
          <ExternalLink
            text="GitHub"
            href="https://github.com/stefanzone/geocode-routing-api"
            spaceBefore
            spaceAfter
          />
          under an open source license <Code content="MIT" /> in accordance with the client&apos;s
          contractual guidelines. A copy of the license, as well as the source code and the
          necessary documentation will be available there.
        </p>
        <small>
          <strong>
            <u>Note</u>:
          </strong>
          <br />
          The data contained in this material is derived from proprietary and third-party sources
          believed to be reliable, is not necessarily all-inclusive and is not guaranteed as to its
          accuracy. It is the sole discretion of the viewer to rely on the information in this
          material.
        </small>
        <br />
        <br />
      </Layout>
    </>
  );
}

export default HomePage;
