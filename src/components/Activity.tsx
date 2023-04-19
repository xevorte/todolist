import { IC_TRASH } from '../configs/svgs';
import { activityType } from '../configs/types';
import { Link } from 'react-router-dom';
import clsx from 'classnames';

type PropsTypes = {
  isLoading: boolean;
  data: activityType;
  to: string;
  onDelete: (e?: any) => void;
};

export default function Component({
  isLoading,
  data,
  to,
  onDelete,
}: Partial<PropsTypes>) {
  return (
    <div
      className={clsx(
        'activity-item group',
        isLoading ? 'animate-pulse' : 'hover:bg-primary hover:ring-sky-500'
      )}
    >
      {isLoading ? (
        <>
          <h2 className='text-lg font-bold placeholder text-slate-300 bg-slate-300 rounded-lg cursor-progress'>
            TITLE ACTIVITY
          </h2>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-slate-300 bg-slate-300 rounded-lg cursor-progress mt-0.5 mr-3'>
              DATE ACTIVITY
            </p>
            <div className='w-6 h-6 bg-slate-300 rounded-md cursor-progress' />
          </div>
        </>
      ) : (
        <>
          <Link to={to || '/'} className='activity-body'>
            <h4>{data?.title}</h4>
          </Link>
          <div className='card-footer flex items-center justify-between'>
            <span className='text-secondary text-sm font-medium mt-1'>
              {data?.created_at}
            </span>
            <IC_TRASH className='cursor-pointer' onClick={onDelete} />
          </div>
        </>
      )}
    </div>
  );
}
