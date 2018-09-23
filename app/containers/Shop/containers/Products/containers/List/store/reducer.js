import {
  SET_PRODUCTS,
  SET_FILTER_PRICE,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  CHANGE_PAGE,
  CHANGE_NUM_ON_PAGE,
  SET_TOTAL_RECORDS,
  CHANGE_FILTER_PRICE,
  CHANGE_FILTER_SORT,
  SET_FILTER_VALUE,
  REMOVE_FILTER_VALUE,
  APPEND_FILTER_VALUE,
  RESET,
  RESET_FILTER,
} from './types';

const INITIAL_FILTER = {
  page: 0,
  num_on_page: 9,
  total_records: 0,
  filter_category: [],
  filter_brand: [],
  filter_season: [],
  filter_size: [],
  filter_composition: [],
  filter_price: {
    min: 0,
    max: 0
  },
  sorting: 1,
};

const INITIAL_STATE = {
  products: [],
  isLoading: false,
  isLoadingTable: false,
  ...INITIAL_FILTER
};

const HANDLERS = {

  [SET_FILTER_VALUE]: (state, { payload }) => ({
    ...state,
    [`filter_${payload.key}`]: payload.value
  }),
  [APPEND_FILTER_VALUE]: (state, { payload }) => ({
    ...state,
    [`filter_${payload.key}`]: [...state[`filter_${payload.key}`], payload.value]
  }),
  [REMOVE_FILTER_VALUE]: (state, { payload }) => ({
    ...state,
    [`filter_${payload.key}`]: state[`filter_${payload.key}`].filter((item) => item !== payload.value)
  }),
  [SET_PRODUCTS]: (state, { payload }) => ({
    ...state,
    products: payload
  }),
  [CHANGE_PAGE]: (state, { payload }) => ({
    ...state,
    page: payload
  }),
  [CHANGE_FILTER_SORT]: (state, { payload }) => ({
    ...state,
    sorting: payload
  }),
  [SET_FILTER_PRICE]: (state, { payload }) => ({
    ...state,
    filter_price: payload
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
  [CHANGE_FILTER_PRICE]: (state, { payload }) => ({
    ...state,
    filter_price: {
      ...state.filter_price,
      [payload.key]: payload.value
    }
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
