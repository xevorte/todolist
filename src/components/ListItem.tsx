import * as SVG from '../configs/svgs';
import { listItemType } from '../configs/types';
import clsx from 'classnames';

type PropsTypes = {
  data: listItemType;
  className: string;
  isLoading: boolean;
  onSwitch: (e?: any) => void;
  onUpdate: (e?: any) => void;
  onDelete: (e?: any) => void;
};

export default function Component(props: Partial<PropsTypes>) {
  return (
    <div className={clsx('list-item-wrapper', props.className)}>
      {props.isLoading ? (
        <>
          <div className='list-item-content animate-pulse'>
            <span className='list-item-checkbox-loading' />
            <span className='list-item-indicator bg-slate-300' />
            <p className='list-item-title-loading'>Title Todo</p>
            <span className='list-item-update-loading' />
          </div>
          <span className='list-item-delete-loading' />
        </>
      ) : (
        <>
          <div className='list-item-content'>
            <div
              className={clsx(
                'list-item-checkbox',
                props.data?.is_active === 1
                  ? 'bg-transparent border-[#C7C7C7]'
                  : 'bg-primary border-primary'
              )}
              onClick={props.onSwitch}
            >
              <SVG.IC_CHECK />
            </div>
            <span
              className={clsx('list-item-indicator', {
                'bg-danger': props.data?.priority === 'very-high',
                'bg-high': props.data?.priority === 'high',
                'bg-normal': props.data?.priority === 'normal',
                'bg-low': props.data?.priority === 'low',
                'bg-veryLow': props.data?.priority === 'very-low',
              })}
            />
            <h3
              className={clsx(
                'list-item-title',
                (props.data?.is_active === 0 &&
                  'text-[#888888] line-through') ||
                  null
              )}
            >
              {props.data?.title}
            </h3>
            <div className='cursor-pointer' onClick={props.onUpdate}>
              <SVG.IC_EDIT />
            </div>
          </div>
          <div>
            <SVG.IC_TRASH
              className='ml-14 cursor-pointer'
              onClick={props.onDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}
