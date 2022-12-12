import { render, screen } from '@testing-library/react';
import { Status } from '../Status';

describe('Status component', () => {
  it('renders success', () => {
    render(<Status successful={true} failureReason={null} />);

    expect(screen.getByText('✅ Launch successful')).toBeInTheDocument();
  });

  it('renders failure', () => {
    const failureReason = 'Oops!';

    render(<Status successful={false} failureReason={failureReason} />);

    expect(screen.getByText(`❌ ${failureReason}`)).toBeInTheDocument();
  });
});
