import type { LaunchData } from '../../types';

type LaunchDateTimeProps = Pick<LaunchData, 'launchDate'>;

const locale = 'en-GB';

const LaunchDateTime = ({ launchDate }: LaunchDateTimeProps) => (
  <span>
    {launchDate.toLocaleDateString(locale)} / {launchDate.toLocaleTimeString(locale)}
  </span>
);

export { LaunchDateTime };
