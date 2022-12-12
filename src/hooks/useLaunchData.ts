import { useEffect, useState } from 'react';
import axios from 'axios';

import type { LaunchData } from '../types';

const API = 'https://api.spacexdata.com/v3/launches';
const NUMBER_OF_ITEMS = 10;

type APIData = any[];

const useLaunchData = (): {
  fetching: boolean;
  error: null | string;
  data: null | LaunchData[];
} => {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<null | LaunchData[]>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<APIData>(API, {
          params: {
            limit: NUMBER_OF_ITEMS,
            sort: 'flight_number', // Sort / Order by should probably be a user selectable option
            order: 'asc',
          },
        });

        setData(extractLaunchData(data));
      } catch (_error) {
        setError('Something went wrong');
      }

      setFetching(false);
    })();
  }, []);

  return {
    fetching,
    error,
    data,
  };
};

const extractLaunchData = (data: APIData): LaunchData[] =>
  data.map(launch => ({
    id: launch.flight_number,
    missionName: launch.mission_name,
    launchDate: new Date(launch.launch_date_utc),
    missionPatch: launch.links.mission_patch_small,
    coreSerials: launch.rocket.first_stage.cores.map((core: { core_serial: string }) => core.core_serial),
    payloads: launch.rocket.second_stage.payloads.map((secondStage: { payload_id: string; payload_type: string }) => ({
      id: secondStage.payload_id,
      type: secondStage.payload_type,
    })),
    successful: launch.launch_success,
    failureReason: launch.launch_failure_details?.reason || null,
  }));

export { useLaunchData };
