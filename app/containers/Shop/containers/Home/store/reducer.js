import {
  SET_PRODUCTS,
  SET_IS_LOADING,
  RESET,
} from './types';

const INITIAL_STATE = {
  products: [],
  isLoading: false,
};

const HANDLERS = {
  [SET_PRODUCTS]: (state, { payload }) => ({
    ...state,
    products: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
