import { setAuth } from '../../bootstraps/bootstrapActions';
import { FormGroup } from '../../components';
import { IC_CHECK } from '../../configs/svgs';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='login-content'>
          <h2>Log in</h2>
          <p>
            Welcome to Xevorte Todolist, please put your email credential below
            to start using the website.
          </p>
          <div className='login-form'>
            <label htmlFor='email'>Email</label>
            <FormGroup
              type='email'
              name='email'
              className='w-full mb-1.5 sm:w-4/5 sm:mb-0'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <span className='login-separator' />
          <div className='flex flex-wrap items-center justify-between'>
            <div
              className='login-checkbox'
              onClick={() => setRememberMe(!rememberMe)}
            >
              <span className={rememberMe ? 'bg-primary' : 'bg-white'}>
                <IC_CHECK width={12} />
              </span>
              <small>Remember Me</small>
            </div>
            <button
              className='login-button'
              disabled={!email}
              onClick={() => {
                if (rememberMe) {
                  dispatch(setAuth({ type: 'locked', data: { email } }))
                } else {
                  dispatch(setAuth({ email }));
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <div className='login-background'>
        <div className='login-background-part one'>
          <div className='login-background-part two'>
            <div className='login-background-part three' />
          </div>
        </div>
      </div>
    </div>
  );
}
