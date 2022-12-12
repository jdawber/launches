import type { LaunchData } from '../../types';

type SerialsInfoProps = Pick<LaunchData, 'coreSerials'>;

const SerialsInfo = ({ coreSerials }: SerialsInfoProps) => (
  <>
    <h3>Core Serials</h3>
    <ul>
      {coreSerials.map((serial, index) => (
        <li key={index}>{serial}</li>
      ))}
    </ul>
  </>
);

export { SerialsInfo };
