import { render, screen } from '@testing-library/react';
import { LaunchCard } from '../LaunchCard';

describe('LaunchCard component', () => {
  it('renders data', () => {
    const { container } = render(
      <LaunchCard
        id={1}
        missionName='mission-name'
        launchDate={new Date('December 17, 2022 01:30:00')}
        missionPatch='https://images2.imgbox.com/40/e3/GypSkayF_o.png'
        coreSerials={[]}
        payloads={[]}
        successful={true}
        failureReason={null}
      />
    );

    expect(screen.getByText('mission-name')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
