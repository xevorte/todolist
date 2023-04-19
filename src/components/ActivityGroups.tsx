import { EMPTY_ACTIVITY } from '../configs/images';
import { getActivitiesApi } from '../configs/apis';
import { activityType } from '../configs/types';
import { Activity } from '.';
import { useQuery } from 'react-query';
import clsx from 'classnames';

export default function Component({
  onDeleteAction,
}: {
  onDeleteAction: (e?: any) => void;
}) {
  const { isFetching: GetActivitiesLoading, data: GetActivitiesData } =
    useQuery('getActivities', getActivitiesApi, {
      onError: () => window.location.replace('500'),
      retry: 1,
    });

  function toLocaleDate(data: string) {
    const date = new Date(data);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <div
      className={clsx(
        'activity-wrapper',
        (GetActivitiesData?.data?.data?.length <= 0 && !GetActivitiesLoading) ? 'block' : ''
      )}
    >
      {GetActivitiesLoading ? (
        Array.from(Array(4), (e, i) => <Activity key={i} isLoading />)
      ) : GetActivitiesData?.data?.data?.length > 0 ? (
        GetActivitiesData?.data?.data?.map((activity: activityType) => (
          <Activity
            key={activity?.id}
            to={`/activity/${activity?.id}`}
            data={{
              ...activity,
              created_at: toLocaleDate(activity?.created_at || ''),
            }}
            onDelete={() =>
              onDeleteAction({
                id: activity?.id,
                title: activity?.title,
              })
            }
          />
        ))
      ) : (
        <img
          src={EMPTY_ACTIVITY}
          alt='illustration'
          width={767}
          className='mx-auto my-16'
        />
      )}
    </div>
  );
}
