import * as ACTION from '../bootstraps/bootstrapActions';
import * as SVG from '../configs/svgs';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import clsx from 'classnames';

export default function Component() {
  const dispatch = useDispatch();
  const { alertSuccess, alertFailed } = useSelector((state: any) => state);
  const resetAlerts = useCallback(() => {
    dispatch(ACTION.setAlertSuccess(undefined));
    dispatch(ACTION.setAlertFailed(undefined));
  }, [dispatch]);

  useEffect(() => {
    if (!!alertSuccess || !!alertFailed) {
      setTimeout(resetAlerts, 1500);
    }
  }, [alertSuccess, alertFailed]);

  return (
    <div
      className={clsx(
        'modal-information',
        !!alertSuccess || !!alertFailed ? 'h-16' : 'h-0'
      )}
      onClick={() =>
        (!!alertSuccess && dispatch(ACTION.setAlertSuccess(undefined))) ||
        null ||
        (!!alertFailed && dispatch(ACTION.setAlertFailed(undefined))) ||
        null
      }
    >
      <div className='absolute w-full'>
        <div className='flex items-center container'>
          {(!!alertSuccess && <SVG.IC_ALERT_SUCCESS />) || null}
          {(!!alertFailed && <SVG.IC_ALERT_FAILED />) || null}
          <span className='text-sm font-medium ml-3.5'>
            {alertSuccess || alertFailed}
          </span>
        </div>
      </div>
    </div>
  );
}
