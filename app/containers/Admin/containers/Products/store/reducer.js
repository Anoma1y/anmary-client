import {
  SET_BRANDS,
  SET_CATEGORIES,
  SET_SEASONS,
  SET_SIZES,
  SET_COMPOSITIONS,
} from './types';

const INITIAL_STATE = {
  brands: [],
  seasons: [],
  categories: [],
  sizes: [],
  compositions: []
};

const HANDLERS = {
  [SET_BRANDS]: (state, { payload }) => ({
    ...state,
    brands: payload
  }),
  [SET_CATEGORIES]: (state, { payload }) => ({
    ...state,
    categories: payload
  }),
  [SET_SIZES]: (state, { payload }) => ({
    ...state,
    sizes: payload
  }),
  [SET_SEASONS]: (state, { payload }) => ({
    ...state,
    seasons: payload
  }),
  [SET_COMPOSITIONS]: (state, { payload }) => ({
    ...state,
    compositions: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);

