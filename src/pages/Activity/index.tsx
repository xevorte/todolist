import * as COMPONENT from '../../components';
import { setAlertFailed } from '../../bootstraps/bootstrapActions';
import { getActivityApi } from '../../configs/apis';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

const options = [
  { value: 'very-high', label: 'Very High', color: '#ED4C5C' },
  { value: 'high', label: 'High', color: '#F8A541' },
  { value: 'normal', label: 'Normal', color: '#00A790' },
  { value: 'low', label: 'Low', color: '#428BC1' },
  { value: 'very-low', label: 'Very Low', color: '#8942C1' },
];

export default function Page() {
  const { id } = useParams();
  const { sort } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const {
    isFetching: GetActivityLoading,
    data: GetActivityData,
    refetch: GetActivity,
  } = useQuery('GetActivity', () => getActivityApi(parseInt(id ?? '')), {
    onError: () => {
      dispatch(setAlertFailed('Activity tidak ditemukan'));
      setTimeout(() => window.location.replace('/404'), 1000);
    },
    retry: 1,
  });

  useEffect(() => {
    GetActivity();
  }, [id]);

  switch (sort) {
    case 'oldest':
      GetActivityData?.data?.todo_items?.sort((todoA: any, todoB: any) => todoA.id - todoB.id);
      break;
    case 'az':
      GetActivityData?.data?.todo_items?.sort((todoA: any, todoB: any) =>
        todoA.title.localeCompare(todoB.title)
      );
      break;
    case 'za':
      GetActivityData?.data?.todo_items?.sort(
        (todoA: any, todoB: any) => -todoA.title.localeCompare(todoB.title)
      );
      break;
    case 'undone':
      GetActivityData?.data?.todo_items?.sort(
        (todoA: any, todoB: any) => todoB.is_active - todoA.is_active
      );
      break;
    default:
      GetActivityData?.data?.todo_items?.sort((todoA: any, todoB: any) => todoB.id - todoA.id);
      break;
  };

  return (
    <section>
      <COMPONENT.ListItemsHeader
        isLoading={GetActivityLoading}
        options={options}
        data={GetActivityData?.data}
      />
      <COMPONENT.ListItemsContent
        isLoading={GetActivityLoading}
        options={options}
        data={GetActivityData?.data?.todo_items}
      />
    </section>
  );
}
