import { IC_SELECTED } from '../configs/svgs';
import { ReactNode } from 'react';
import clsx from 'classnames';

type PropsTypes = {
  active?: string;
  options: {
    icon?: ReactNode;
    label: string;
    value?: string;
  }[];
  className?: string;
  onClick?: (e?: any) => void;
};

export default function Component(props: PropsTypes) {
  const { active, options, className, onClick } = props;

  return (
    <div
      className={clsx(
        'dropdown',
        className
      )}
    >
      <div className='absolute w-full'>
        {options.map((option, i) => (
          <div
            key={i}
            className={clsx(
              'dropdown-item',
              option.value === active ? 'bg-sky-100' : 'bg-transparent'
            )}
            onClick={() => onClick?.(option)}
          >
            <div className='flex items-center'>
              {(option.icon && <div className='mr-3'>{option.icon}</div>) ||
                null}
              <span>{option.label}</span>
            </div>
            <IC_SELECTED
              className={clsx(
                'transition-all',
                (option.value !== active && 'opacity-0') || null
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
