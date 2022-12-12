import { render, screen } from '@testing-library/react';
import { PayloadInfo } from '../PayloadInfo';

describe('PayloadInfo component', () => {
  it('renders data', () => {
    render(
      <PayloadInfo
        payloads={[
          { id: 'one', type: 'type-one' },
          { id: 'two', type: 'type-two' },
        ]}
      />
    );

    expect(screen.getByText('Payload')).toBeInTheDocument();

    expect(screen.getByText('type-one')).toBeInTheDocument();
    expect(screen.getByText('type-two')).toBeInTheDocument();
  });
});
