import {
  SET_NEWS,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  RESET,
} from './types';

const INITIAL_STATE = {
  news: [],
  isLoading: false,
  isLoadingTable: false,
};

const HANDLERS = {
  [SET_NEWS]: (state, { payload }) => ({
    ...state,
    news: payload
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
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
