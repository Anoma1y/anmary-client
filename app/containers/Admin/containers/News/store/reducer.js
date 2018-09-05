import {
  SET_CURRENCY,
  SET_CATEGORY
} from './types';

const INITIAL_STATE = {
  currency: [],
  category: [],
  shift_id: null,
};

const HANDLERS = {
  [SET_CURRENCY]: (state, { payload }) => ({
    ...state,
    currency: payload
  }),
  [SET_CATEGORY]: (state, { payload }) => ({
    ...state,
    category: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);

