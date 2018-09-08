import {
  SET_COMPOSITIONS,
  APPEND_COMPOSITION,
  REMOVE_COMPOSITION,
  SET_SIZES,
  APPEND_SIZE,
  REMOVE_SIZE,
  SET_PRODUCT,
  SET_IS_LOADING,
  SET_IMAGES,
  APPEND_IMAGE,
  REMOVE_IMAGE,
  RESET,

  SET_SIZES_AVAILABLE,
  SET_SIZES_USED,
  CHANGE_CURRENT_SIZE
} from './types';
import _ from 'lodash';

const INITIAL_STATE = {
  images: [],
  compositions: [],
  isLoading: false,
  product: {},
  sizes: [],
  sizesProduct: [],
  sizesUsed: [],
  sizesAvailable: [],
  currentSize: '',
};

const HANDLERS = {
  [SET_SIZES_AVAILABLE]: (state, { payload }) => ({
    ...state,
    sizesAvailable: payload
  }),
  [SET_SIZES_USED]: (state, { payload }) => ({
    ...state,
    sizesUsed: payload
  }),
  [CHANGE_CURRENT_SIZE]: (state, { payload }) => ({
    ...state,
    currentSize: payload
  }),
  [APPEND_SIZE]: (state, { payload }) => {
    const sizesProduct = [...state.sizesProduct, payload];
    const newSizes = _.uniqBy(sizesProduct, 'id');

    return {
      ...state,
      sizesProduct: newSizes
    };
  },
  [REMOVE_SIZE]: (state, { payload }) => ({
    ...state,
    sizesProduct: [...state.sizesProduct].filter((it) => it.size_id !== payload)
  }),

  [SET_COMPOSITIONS]: (state, { payload }) => ({
    ...state,
    compositions: payload
  }),
  [SET_SIZES]: (state, { payload }) => ({
    ...state,
    sizes: payload
  }),
  [APPEND_COMPOSITION]: (state, { payload }) => {
    const compositions = [...state.compositions, payload];
    const newCompositions = _.uniqBy(compositions, 'id');

    return {
      ...state,
      compositions: newCompositions
    };
  },
  [REMOVE_COMPOSITION]: (state, { payload }) => ({
    ...state,
    compositions: [...state.compositions].filter((it) => it.id !== payload)
  }),

  [SET_PRODUCT]: (state, { payload }) => ({
    ...state,
    product: payload
  }),
  [SET_IMAGES]: (state, { payload }) => ({
    ...state,
    images: payload
  }),
  [APPEND_IMAGE]: (state, { payload }) => ({
    ...state,
    images: [...state.images, payload]
  }),
  [REMOVE_IMAGE]: (state, { payload }) => ({
    ...state,
    images: state.images.filter((file) => file.id !== payload)
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
