import {
  SET_PRODUCTS,
  CHANGE_PAGE,
  CHANGE_NUM_ON_PAGE,
  SET_TOTAL_RECORDS,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  RESET,
  RESET_FILTER,
} from './types';
import _ from 'lodash';

const INITIAL_FILTER = {
  page: 0,
  num_on_page: 10,
  total_records: 0,
};

const INITIAL_STATE = {
  products: [],
  isLoading: false,
  isLoadingTable: false,
  ...INITIAL_FILTER
};

const HANDLERS = {
  [SET_PRODUCTS]: (state, { payload }) => ({
    ...state,
    products: payload
  }),
  [CHANGE_PAGE]: (state, { payload }) => ({
    ...state,
    page: payload
  }),
  [CHANGE_NUM_ON_PAGE]: (state, { payload }) => ({
    ...state,
    num_on_page: payload
  }),
  [SET_TOTAL_RECORDS]: (state, { payload }) => ({
    ...state,
    total_records: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_IS_LOADING_TABLE]: (state, { payload }) => ({
    ...state,
    isLoadingTable: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
  [RESET_FILTER]: (state) => ({
    ...state,
    ...INITIAL_FILTER
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
