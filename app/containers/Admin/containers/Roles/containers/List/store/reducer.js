import {
  SET_ROLES,
  RESET
} from './types';

const INITIAL_STATE = {
  roles: []
}

const HANDLERS = {
  [SET_ROLES]: (state, { payload }) => ({
    ...state,
    roles: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
