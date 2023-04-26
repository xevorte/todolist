import { IC_CLOSE } from '../configs/svgs';
import { setAuth } from '../bootstraps/bootstrapActions';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Component() {
  const [user, setUser] = useState<any>({});
  const states = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (states.auth || states.authLocked) {
      setUser(JSON.parse(atob(states.auth || states.authLocked)));
    }
  }, [states]);

  return (
    <nav className='header'>
      <div className='container flex flex-wrap items-center justify-between py-9'>
        <h1>TO DO LIST APP</h1>
        <div className='flex items-center justify-between w-full bg-sky-200 rounded-xl p-2 pl-[18px] mt-4 sm:w-fit sm:m-0'>
          <span className='w-full text-slate-700 text-sm font-medium select-none mt-0.5 overflow-hidden sm:w-36 sm:truncate'>
            {user.email}
          </span>
          <span
            className='flex items-center bg-white rounded-md cursor-pointer px-2 py-2 ml-4'
            onClick={() => {
              dispatch(setAuth({ type: 'reset' }));
            }}
          >
            <IC_CLOSE width={12} />
          </span>
        </div>
      </div>
    </nav>
  );
}
