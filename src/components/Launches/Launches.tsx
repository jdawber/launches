import { useLaunchData } from '../../hooks';
import { LaunchCard } from '..';

const Launches = () => {
  const { fetching, error, data } = useLaunchData();

  return (
    <>
      <header>
        <h1>SpaceX Launches</h1>
      </header>
      {fetching ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading data</div>
      ) : (
        data.map(launch => {
          const { id } = launch;
          return <LaunchCard key={id} {...launch} />;
        })
      )}
    </>
  );
};

export { Launches };
