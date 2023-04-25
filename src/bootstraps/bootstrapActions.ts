import * as CONST from './bootstrapConstants';

export const setAlertFailed = (payload: any) => ({
  type: CONST.SET_ALERT_FAILED,
  payload,
});

export const setAlertSuccess = (payload: any) => ({
  type: CONST.SET_ALERT_SUCCESS,
  payload,
});

export const setAuth = (payload: any) => ({
  type: CONST.SET_AUTH,
  payload,
});

export const setSort = (payload: any) => ({
  type: CONST.SET_SORT,
  payload,
});
