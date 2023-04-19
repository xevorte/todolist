import { ReactNode } from 'react';
import { IC_LOADING } from '../configs/svgs';
import clsx from 'classnames';

type PropsTypes = {
  type: 'primary' | 'danger' | 'light';
  icon?: ReactNode;
  label: string;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (e?: any) => void | undefined;
};

export default function Component(props: PropsTypes) {
  const { type, icon, label, isLoading, className, disabled, onClick } = props;

  return (
    <button
      className={clsx(
        'btn',
        {
          'btn-primary': type === 'primary',
          'btn-danger': type === 'danger',
          'btn-light': type === 'light',
        },
        className
      )}
      onClick={!isLoading ? onClick : undefined}
      disabled={disabled}
    >
      {isLoading ? (
        <div className='animate-spin'>
          <IC_LOADING />
        </div>
      ) : (
        <>
          {(icon && <div className='mr-2'>{icon}</div>) || null}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
