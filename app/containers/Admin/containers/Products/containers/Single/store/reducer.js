import {
  SET_PRODUCT,
  RESET
} from './types';

const INITIAL_STATE = {
  product: {},
  mainImage: {}
};

const HANDLERS = {
  [SET_PRODUCT]: (state, { payload }) => ({
    ...state,
    product: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE,
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
