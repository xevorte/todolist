import * as ACTION from '../../bootstraps/bootstrapActions';
import * as API from '../../configs/apis';
import * as COMPONENT from '../../components';
import * as SVG from '../../configs/svgs';
import { activityType } from '../../configs/types';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Page() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [activeActivity, setActiveActivity] = useState<any>({});
  const [formDataCreateActivity, setFormDataCreateActivity] = useState({
    title: '',
  });

  const CreateActivity = useMutation(
    (data: activityType) => API.createActivityApi(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getActivities');
        dispatch(ACTION.setAlertSuccess('Activity berhasil ditambahkan'));
      },
      onError: () => {
        dispatch(ACTION.setAlertFailed('Activity gagal ditambahkan'));
        setTimeout(() => window.location.replace('/500'), 1000);
      },
    }
  );

  const DeleteActivity = useMutation(
    (id: number) => API.deleteActivityApi(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getActivities');
        dispatch(ACTION.setAlertSuccess('Activity berhasil dihapus'));
      },
      onError: () => {
        dispatch(ACTION.setAlertFailed('Activity gagal dihapus'));
        setTimeout(() => window.location.replace('/500'), 500);
      },
    }
  );

  useEffect(() => {
    !isOpenCreateModal && setFormDataCreateActivity({ title: '' });
  }, [isOpenCreateModal]);

  return (
    <section>
      <COMPONENT.Modal
        isOpen={isOpenCreateModal}
        setIsOpen={() => setIsOpenCreateModal(!isOpenCreateModal)}
        header='Tambah Activity Baru'
        isLoading={CreateActivity.isLoading}
        disabled={!formDataCreateActivity?.title}
        onClick={() => {
          setIsOpenCreateModal(false);
          CreateActivity.mutate(formDataCreateActivity);
        }}
      >
        <COMPONENT.FormGroup
          label='Title Activity'
          name='title'
          type='text'
          value={formDataCreateActivity?.title}
          placeholder='Tambahkan title activity'
          onChange={(e) =>
            setFormDataCreateActivity((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </COMPONENT.Modal>
      <COMPONENT.Modal
        className='px-16 py-8'
        isOpen={isOpenDeleteModal}
        setIsOpen={() => setIsOpenDeleteModal(!isOpenDeleteModal)}
      >
        <SVG.IC_WARNING className='mx-auto' />
        <h2 className='text-lg font-medium text-center my-9'>
          Apakah anda yakin menghapus activity <br />
          <strong>"{activeActivity?.title}"</strong>?
        </h2>
        <div className='flex justify-center'>
          <COMPONENT.Button
            type='light'
            label='Batal'
            className='w-[150px] mr-5'
            onClick={() => setIsOpenDeleteModal(!isOpenDeleteModal)}
          />
          <COMPONENT.Button
            type='danger'
            label='Hapus'
            className='w-[150px]'
            isLoading={DeleteActivity.isLoading}
            disabled={DeleteActivity.isLoading}
            onClick={() => {
              setIsOpenDeleteModal(false);
              DeleteActivity.mutate(activeActivity?.id);
            }}
          />
        </div>
      </COMPONENT.Modal>
      <div className='todo-header'>
        <h1 className='todo-title'>Activity</h1>
        <COMPONENT.Button
          type='primary'
          icon={<SVG.IC_PLUS />}
          label='Tambah'
          className='mb-4'
          isLoading={CreateActivity.isLoading}
          onClick={() => setIsOpenCreateModal(!isOpenCreateModal)}
        />
      </div>
      <div className='dashboard-content'>
        <COMPONENT.ActivityGroups
          onDeleteAction={(data: any) => {
            setActiveActivity(data);
            setIsOpenDeleteModal(!isOpenDeleteModal);
          }}
        />
      </div>
    </section>
  );
}
