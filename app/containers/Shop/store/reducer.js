import {
  CHANGE_SEARCH_VALUE,
} from './types';

const INITIAL_STATE = {
  search: ''
};

const HANDLERS = {
  [CHANGE_SEARCH_VALUE]: (state, { payload }) => ({
    ...state,
    search: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
