import * as ACTION from '../bootstraps/bootstrapActions';
import * as API from '../configs/apis';
import * as COMPONENT from '../components';
import * as SVG from '../configs/svgs';
import { EMPTY_TODO } from '../configs/images';
import { listItemType } from '../configs/types';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Component(props: {
  isLoading: boolean;
  options: any;
  data: listItemType[];
}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [activeListItem, setActiveListItem] = useState<listItemType>({});
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const UpdateListItem = useMutation(
    ({ id, data }: { id: number; data: listItemType }) =>
      API.updateListItemApi(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('GetActivity');
        dispatch(ACTION.setAlertSuccess('List item berhasil diupdate'));
      },
      onError: () => {
        dispatch(ACTION.setAlertFailed('List item gagal diupdate'));
        setTimeout(() => window.location.replace('/500'), 1000);
      },
    }
  );
  const DeleteListItem = useMutation(
    (id: number) => API.deleteListItemApi(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('GetActivity');
        dispatch(ACTION.setAlertSuccess('List item berhasil dihapus'));
      },
      onError: () => {
        dispatch(ACTION.setAlertFailed('List item gagal dihapus'));
        setTimeout(() => window.location.replace('/500'), 1000);
      },
    }
  );

  useEffect(() => {
    !isOpenUpdateModal && setActiveListItem({});
  }, [isOpenUpdateModal]);

  return (
    <>
      <COMPONENT.Modal
        isOpen={isOpenUpdateModal}
        setIsOpen={() => setIsOpenUpdateModal(!isOpenUpdateModal)}
        header='Edit List Item'
        isLoading={UpdateListItem.isLoading}
        disabled={!activeListItem?.title || !activeListItem?.priority}
        onClick={() => {
          setIsOpenUpdateModal(false);
          UpdateListItem.mutate({
            id: activeListItem.id ?? 0,
            data: activeListItem,
          });
        }}
      >
        <COMPONENT.FormGroup
          label='Title List Item'
          name='nama'
          type='text'
          value={activeListItem?.title}
          placeholder='Tambahkan nama list item'
          onChange={(e) =>
            setActiveListItem((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <COMPONENT.FormGroup
          label='Priority'
          name='priority'
          type='select'
          className='md:w-2/5 mt-4'
          options={props.options}
          value={
            props.options.filter(
              (e: any) => e.value === activeListItem?.priority
            )[0]
          }
          placeholder='Pilih priority'
          onChange={(e) =>
            setActiveListItem((prev) => ({
              ...prev,
              priority: e.value,
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
          Apakah anda yakin menghapus List Item <br />
          <strong>"{activeListItem?.title}"</strong>?
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
            isLoading={DeleteListItem.isLoading}
            disabled={DeleteListItem.isLoading}
            onClick={() => {
              setIsOpenDeleteModal(false);
              DeleteListItem.mutate(activeListItem?.id ?? 0);
            }}
          />
        </div>
      </COMPONENT.Modal>
      <div className='detail-content container mt-11'>
        {props.isLoading ? (
          Array.from(Array(4), (e, i) => (
            <COMPONENT.ListItem key={i} isLoading className='mb-3' />
          ))
        ) : props.data.length > 0 ? (
          props.data?.map((data: listItemType) => (
            <COMPONENT.ListItem
              key={data.id}
              data={data}
              className='mb-3'
              onSwitch={() =>
                UpdateListItem.mutate({
                  id: data.id ?? 0,
                  data: {
                    is_active: data.is_active === 1 ? 0 : 1,
                  },
                })
              }
              onUpdate={() => {
                setIsOpenUpdateModal(!isOpenUpdateModal);
                setActiveListItem(data);
              }}
              onDelete={() => {
                setIsOpenDeleteModal(!isOpenDeleteModal);
                setActiveListItem(data);
              }}
            />
          ))
        ) : (
          <img
            src={EMPTY_TODO}
            alt='illustration'
            width={767}
            className='mx-auto'
          />
        )}
      </div>
    </>
  );
}
