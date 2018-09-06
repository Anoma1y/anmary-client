import {
  SET_USERS,
  RESET
} from './types';

const INITIAL_STATE = {
  users: [],
}

const HANDLERS = {
  [SET_USERS]: (state, { payload }) => ({
    ...state,
    users: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
