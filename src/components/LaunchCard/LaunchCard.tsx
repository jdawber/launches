import React from 'react';
import Image from 'next/image';
import type { LaunchData } from '../../types';
import styled from 'styled-components';

import { Status } from './Status';
import { SerialsInfo } from './SerialsInfo';
import { PayloadInfo } from './PayloadInfo';
import { LaunchDateTime } from './LaunchDateTime';

const Root = styled.article`
  border: 1px solid #333;
  background: #666;
  border-radius: 1rem;
  margin: 1rem 0;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;

  h2 {
    margin: 0;
  }
`;

const LaunchDataContainer = styled.div`
  margin: 1rem;

  @media screen and (min-width: 800px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const InfoContainer = styled.div`
  margin-top: 1rem;

  h3 {
    margin: 0;
  }

  ul {
    margin: 0 0 1rem 0;
  }

  @media screen and (min-width: 800px) {
    margin: 0 0 0 2rem;

    h3 {
      margin: 0;
    }
  }
`;

type LaunchProps = LaunchData;

const LaunchCard = ({ id, missionName, launchDate, missionPatch, coreSerials, payloads, successful, failureReason = null }: LaunchProps) => (
  <Root data-id={id}>
    <Header>
      <h2>{missionName}</h2>
      <LaunchDateTime launchDate={launchDate} />
    </Header>
    <LaunchDataContainer>
      <Status successful={successful} failureReason={failureReason} />
      {missionPatch && (
        <div>
          <Image src={missionPatch} width='150' height='150' alt={`${missionName} mission patch`} />
        </div>
      )}
      <InfoContainer>
        <SerialsInfo coreSerials={coreSerials} />
        <PayloadInfo payloads={payloads} />
      </InfoContainer>
    </LaunchDataContainer>
  </Root>
);

export { LaunchCard };
