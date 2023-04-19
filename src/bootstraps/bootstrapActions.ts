import * as CONST from './bootstrapConstants';

export const setSort = (payload: any) => ({
  type: CONST.SET_SORT,
  payload,
});

export const setAlertSuccess = (payload: any) => ({
  type: CONST.SET_ALERT_SUCCESS,
  payload,
});

export const setAlertFailed = (payload: any) => ({
  type: CONST.SET_ALERT_FAILED,
  payload,
});
