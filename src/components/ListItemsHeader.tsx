import * as ACTION from '../bootstraps/bootstrapActions';
import * as API from '../configs/apis';
import * as COMPONENT from '../components';
import * as SVG from '../configs/svgs';
import { activityType } from '../configs/types';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import clsx from 'classnames';

type PropsTypes = {
  isLoading?: boolean;
  options: any;
  data: activityType;
};

const sortOptions = [
  {
    icon: <SVG.IC_SORT_NEWEST />,
    label: 'Terbaru',
    value: 'newest',
  },
  {
    icon: <SVG.IC_SORT_OLDEST />,
    label: 'Terlama',
    value: 'oldest',
  },
  {
    icon: <SVG.IC_SORT_AZ />,
    label: 'A-Z',
    value: 'az',
  },
  {
    icon: <SVG.IC_SORT_ZA />,
    label: 'Z-A',
    value: 'za',
  },
  {
    icon: <SVG.IC_SORT_UNDONE />,
    label: 'Belum Selesai',
    value: 'undone',
  },
];

export default function Component(props: PropsTypes) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { sort } = useSelector((state: any) => state);
  const inputRef = useRef<Array<HTMLDivElement | null>>([]);

  const [inputTitle, setInputTitle] = useState('Activity');
  const [isActiveSort, setIsActiveSort] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(false);
  const [formDataCreateListItem, setFormDataCreateListItem] = useState<any>();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const addItem = (data: any) => API.createListItemApi(data);

  const UpdateActivity = useMutation(
    ({ id, title }: PropsTypes['data']) =>
      API.updateActivityApi(id ?? 0, { title }),
    {
      onError: () => {
        dispatch(ACTION.setAlertFailed('Activity gagal diupdate'));
        setTimeout(() => window.location.replace('/500'), 1000);
      },
    }
  );
  const CreateListItem = useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('GetActivity');
      dispatch(ACTION.setAlertSuccess('List item berhasil ditambahkan'));
    },
    onError: () => {
      dispatch(ACTION.setAlertFailed('List item gagal ditambahkan'));
      setTimeout(() => window.location.replace('/500'), 1000);
    },
  });

  useEffect(() => {
    if (!props.isLoading) {
      setInputTitle(props.data?.title);
    }
  }, [props.isLoading]);

  useEffect(() => {
    setFormDataCreateListItem((prev: any) => ({
      ...prev,
      activity_group_id: props.data?.id,
    }));
  }, [props.data?.id]);

  useEffect(() => {
    !isOpenCreateModal &&
      setFormDataCreateListItem((prev: any) => ({
        ...prev,
        title: '',
        priority: '',
      }));
  }, [isOpenCreateModal]);

  useEffect(() => {
    const handleOutsideInput = (event: any) => {
      if (!inputRef.current.includes(event.target)) {
        setUpdateTitle(false);
      }
    };

    return window.addEventListener('click', handleOutsideInput);
  }, [inputRef]);

  return (
    <>
      <COMPONENT.Modal
        isOpen={isOpenCreateModal}
        setIsOpen={() => setIsOpenCreateModal(!isOpenCreateModal)}
        header='Tambah List Item Baru'
        isLoading={CreateListItem.isLoading}
        disabled={
          !formDataCreateListItem?.title || !formDataCreateListItem?.priority
        }
        onClick={() => {
          setIsOpenCreateModal(false);
          CreateListItem.mutate(formDataCreateListItem);
        }}
      >
        <COMPONENT.FormGroup
          label='Title List Item'
          name='nama'
          type='text'
          value={formDataCreateListItem?.title}
          placeholder='Tambahkan nama list item'
          onChange={(e) =>
            setFormDataCreateListItem((prev: any) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <COMPONENT.FormGroup
          label='Priority'
          name='priority'
          type='select'
          className='mt-4'
          options={props.options}
          value={
            props.options.filter(
              (e: any) => e.value === formDataCreateListItem?.priority
            )[0]
          }
          placeholder='Pilih priority'
          onChange={(e) =>
            setFormDataCreateListItem((prev: any) => ({
              ...prev,
              priority: e.value,
            }))
          }
        />
      </COMPONENT.Modal>
      <div
        className={clsx(
          'activity-header',
          (props.isLoading && 'animate-pulse') || null
        )}
      >
        <div className='flex items-center mb-4'>
          <div
            className='flex-shrink-0 cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <SVG.IC_BACK />
          </div>
          <input
            ref={(el) => (inputRef.current[0] = el)}
            type='text'
            className={clsx(
              'activity-header-input',
              props.isLoading || !props.data?.title
                ? 'bg-slate-300 text-slate-300 rounded-lg'
                : 'bg-transparent',
              updateTitle ? 'border-b-dark' : 'border-b-transparent'
            )}
            style={{
              width:
                updateTitle || window.innerWidth < 768
                  ? '100%'
                  : `${inputTitle?.length}ch`,
            }}
            value={inputTitle}
            onChange={(e) => {
              setInputTitle(e.target.value);
              UpdateActivity.mutate({
                id: props.data?.id,
                title: e.target.value,
              });
            }}
            onClick={() => {
              setUpdateTitle(true);
              UpdateActivity.mutate({
                id: props.data?.id,
                title: inputTitle,
              });
            }}
          />
          <div
            ref={(el) => (inputRef.current[1] = el)}
            className='flex-shrink-0 cursor-pointer'
            onClick={() => {
              setUpdateTitle(!updateTitle);
              UpdateActivity.mutate({
                id: props.data?.id,
                title: inputTitle,
              });
            }}
          >
            <SVG.IC_EDIT className='pointer-events-none' />
          </div>
        </div>
        <div className='relative flex items-center ml-4 mb-4'>
          <COMPONENT.ListItemsSort
            active={sort}
            options={sortOptions}
            className={clsx(
              'absolute left-0 top-full w-60 mt-4',
              isActiveSort ? 'min-h-[280px]' : 'min-h-0'
            )}
            onClick={(data) => dispatch(ACTION.setSort(data.value))}
          />
          <div
            className='btn-sort-wrapper'
            onClick={() => setIsActiveSort(!isActiveSort)}
          >
            <SVG.IC_SORT />
          </div>
          <COMPONENT.Button
            type='primary'
            icon={<SVG.IC_PLUS />}
            label='Tambah'
            onClick={() => setIsOpenCreateModal(!isOpenCreateModal)}
            isLoading={props.isLoading}
            disabled={props.isLoading}
          />
        </div>
      </div>
    </>
  );
}
