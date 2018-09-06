import {
  SET_SCHEMA
} from './types';

const INITIAL_STATE = {
  schema: {}
};

const HANDLERS = {
  [SET_SCHEMA]: (state, { payload }) => ({
    ...state,
    schema: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
