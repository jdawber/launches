import { renderHook } from '@testing-library/react-hooks';
import { useLaunchData } from '../useLaunchData';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(rest.get('https://api.spacexdata.com/v3/launches', (req, res, ctx) => res(ctx.status(403), 'Oops!')));

describe('useLaunchData hook', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('returns fetching state', () => {
    const { result } = renderHook(() => useLaunchData());

    expect(result.current).toMatchObject({
      fetching: true,
      error: null,
      data: null,
    });
  });

  it('returns error state', async () => {
    const { result, waitForValueToChange } = renderHook(() => useLaunchData());

    await waitForValueToChange(() => {
      return result.current.fetching;
    });

    expect(result.current).toMatchObject({
      fetching: false,
      error: 'Something went wrong',
      data: null,
    });
  });

  it('returns data', async () => {
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

    const { result, waitForValueToChange } = renderHook(() => useLaunchData());

    await waitForValueToChange(() => {
      return result.current.fetching;
    });

    expect(result.current).toMatchObject({
      fetching: false,
      error: null,
      data: [
        {
          id: 1,
          missionName: 'Mission 1',
          launchDate: new Date('2006-03-24T22:30:00.000Z'),
          missionPatch: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
          coreSerials: ['one'],
          payloads: [
            {
              id: '1',
              type: 'type-1',
            },
          ],
          successful: true,
        },
      ],
    });
  });
});
