import {
  SET_USER,
  RESET
} from './types';

const INITIAL_STATE = {
  user: {},
  isLoading: false
}

const HANDLERS = {
  [SET_USER]: (state, { payload }) => ({
    ...state,
    user: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
