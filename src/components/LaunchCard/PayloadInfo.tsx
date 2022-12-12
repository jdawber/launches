import type { LaunchData } from '../../types';

type PayloadInfoProps = Pick<LaunchData, 'payloads'>;

const PayloadInfo = ({ payloads }: PayloadInfoProps) => (
  <>
    <h3>Payload</h3>
    <ul>
      {payloads.map(({ id, type }) => (
        <li key={id}>{type}</li>
      ))}
    </ul>{' '}
  </>
);

export { PayloadInfo };
