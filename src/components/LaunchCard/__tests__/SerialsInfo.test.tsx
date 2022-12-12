import { render, screen } from '@testing-library/react';
import { SerialsInfo } from '../SerialsInfo';

describe('SerialsInfo component', () => {
  it('renders data', () => {
    render(<SerialsInfo coreSerials={['one', 'two', 'three']} />);

    expect(screen.getByText('Core Serials')).toBeInTheDocument();

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    expect(screen.getByText('three')).toBeInTheDocument();
  });
});
