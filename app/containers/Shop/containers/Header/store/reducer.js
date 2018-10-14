import {
  SET_COUNT_ITEMS,
  CHANGE_COUNT_ITEMS
} from './types';

const INITIAL_STATE = {
  count_items: {
    cart: 0,
    favorite: 0
  }
};

const HANDLERS = {
  [SET_COUNT_ITEMS]: (state, { payload }) => ({
    ...state,
    count_items: payload
  }),
  [CHANGE_COUNT_ITEMS]: (state, { payload }) => ({
    ...state,
    count_items: {
      ...state.count_items,
      [payload.key]: payload.value
    }
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
