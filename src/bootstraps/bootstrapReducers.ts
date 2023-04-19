import * as CONST from './bootstrapConstants';
import initialStates from './bootstrapInitialStates';

export default function Reducer(states = initialStates, action: any) {
  const { payload, type } = action;

  const actions = {
    [CONST.SET_SORT]: () => ({
      ...states,
      sort: payload,
    }),
    [CONST.SET_ALERT_SUCCESS]: () => ({
      ...states,
      alertSuccess: payload,
    }),
    [CONST.SET_ALERT_FAILED]: () => ({
      ...states,
      alertFailed: payload,
    }),
    DEFAULT: () => states,
  };

  return (actions[type as keyof typeof actions] || actions.DEFAULT)();
}
