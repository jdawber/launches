import { render, screen } from '@testing-library/react';
import { Launches } from '../Launches';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://api.spacexdata.com/v3/launches', (_req, res, ctx) =>
    res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Oops',
      })
    )
  )
);

describe('Launches component', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('renders component', () => {
    render(<Launches />);

    expect(screen.getByText('SpaceX Launches')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message', async () => {
    render(<Launches />);

    expect(await screen.findByText('Error loading data')).toBeInTheDocument();
  });

  it('renders launch cards', async () => {
    server.use(
      rest.get('https://api.spacexdata.com/v3/launches', (_req, res, ctx) =>
        res(
          ctx.json([
            {
              flight_number: 1,
              mission_name: 'Mission 1',
              launch_date_utc: '2006-03-24T22:30:00.000Z',
              launch_success: true,
              links: {
                mission_patch_small: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
              },
              rocket: {
                first_stage: {
                  cores: [
                    {
                      core_serial: 'one',
                    },
                  ],
                },
                second_stage: {
                  payloads: [
                    {
                      payload_id: '1',
                      payload_type: 'type-1',
                    },
                  ],
                },
              },
            },
          ])
        )
      )
    );

    render(<Launches />);

    expect(await screen.findByText('Mission 1')).toBeInTheDocument();
  });
});
