import { render, screen } from '@testing-library/react';
import { LaunchDateTime } from '../LaunchDateTime';

describe('LaunchDateTime component', () => {
  it('renders date', () => {
    const launchDate = new Date('December 17, 2022 01:30:00');

    render(<LaunchDateTime launchDate={launchDate} />);

    expect(screen.getByText('17/12/2022 / 01:30:00')).toBeInTheDocument();
  });
});
