import * as CONST from './bootstrapConstants';
import initialStates from './bootstrapInitialStates';

export default function Reducer(states = initialStates, action: any) {
  const { payload, type } = action;

  const actions = {
    [CONST.SET_ALERT_SUCCESS]: () => ({
      ...states,
      alertSuccess: payload,
    }),
    [CONST.SET_ALERT_FAILED]: () => ({
      ...states,
      alertFailed: payload,
    }),
    [CONST.SET_AUTH]: () => {
      if (payload?.type === 'locked') {
        return {
          ...states,
          authLocked: payload?.data,
        };
      } else if (payload?.type === 'reset') {
        return {
          ...states,
          auth: {
            email: undefined
          },
          authLocked: {
            email: undefined,
          },
        };
      } else {
        return {
          ...states,
          auth: payload,
        };
      }
    },
    [CONST.SET_SORT]: () => ({
      ...states,
      sort: payload,
    }),
    DEFAULT: () => states,
  };

  return (actions[type as keyof typeof actions] || actions.DEFAULT)();
}
