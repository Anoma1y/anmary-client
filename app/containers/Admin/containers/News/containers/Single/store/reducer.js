import {
  SET_OPERATION,
  RESET
} from './types';

const INITIAL_STATE = {
  operation: {}
};

const HANDLERS = {
  [SET_OPERATION]: (state, { payload }) => ({
    ...state,
    operation: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE,
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
