import {
  SET_USER,
} from './types';

const INITIAL_STATE = {
  user: {},
};

const HANDLERS = {
  [SET_USER]: (state, { payload }) => ({
    ...state,
    user: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
