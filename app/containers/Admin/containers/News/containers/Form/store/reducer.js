import {
  SET_IMAGE,
  SET_IS_LOADING,
  SET_NEWS,
  REMOVE_IMAGE,
  RESET,
} from './types';

const INITIAL_STATE = {
  image: {},
  isLoading: false,
  news: {},
};

const HANDLERS = {
  [SET_NEWS]: (state, { payload }) => ({
    ...state,
    news: payload
  }),
  [SET_IMAGE]: (state, { payload }) => ({
    ...state,
    image: payload
  }),
  [REMOVE_IMAGE]: (state) => ({
    ...state,
    image: {}
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE,
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
