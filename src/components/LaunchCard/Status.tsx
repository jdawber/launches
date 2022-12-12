import type { LaunchData } from '../../types';
import styled from 'styled-components';

const Root = styled.div`
  margin-bottom: 1rem;

  @media screen and (min-width: 800px) {
    width: 100%;
  }
`;

type StatusProps = Pick<LaunchData, 'successful' | 'failureReason'>;

const Status = ({ successful, failureReason }: StatusProps) => <Root>{successful ? '✅ Launch successful' : `❌ ${failureReason ? failureReason : ''}`}</Root>;

export { Status };
