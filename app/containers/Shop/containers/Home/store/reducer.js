import {
  SET_PRODUCTS,
  SET_IS_LOADING,
  CHANGE_SUBSCRIBE_CONTACT,
  SET_SUBSCRIBE_ERROR,
  RESET,
} from './types';

const INITIAL_STATE = {
  products: [],
  subscribe_contact: '',
  subscribe_error: '',
  isLoading: false,
};

const HANDLERS = {
  [SET_PRODUCTS]: (state, { payload }) => ({
    ...state,
    products: payload
  }),
  [SET_SUBSCRIBE_ERROR]: (state, { payload }) => ({
    ...state,
    subscribe_error: payload
  }),
  [CHANGE_SUBSCRIBE_CONTACT]: (state, { payload }) => ({
    ...state,
    subscribe_contact: payload
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
