import {
  SET_NEWS,
  RESET
} from './types';

const INITIAL_STATE = {
  news: {}
};

const HANDLERS = {
  [SET_NEWS]: (state, { payload }) => ({
    ...state,
    news: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE,
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
