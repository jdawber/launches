import Head from 'next/head';
import styled from 'styled-components';

import { Launches } from '../components';

const Main = styled.main`
  padding: 0 1rem;

  @media screen and (min-width: 800px) {
    margin: 0 auto;
    width: 800px;
  }
}

`;

const Home = () => (
  <>
    <Head>
      <title>SpaceX Launches</title>
      <meta name='description' content='Find information about SpaceX Launches' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Main>
      <Launches />
    </Main>
  </>
);

export default Home;
