import {
  SET_PRODUCT,
  CHANGE_MAIN_IMAGE,
  CHANGE_CURRENT_SIZE,
  RESET
} from './types';

const INITIAL_STATE = {
  product: {},
  mainImage: {},
  currentSize: ''
};

const HANDLERS = {
  [SET_PRODUCT]: (state, { payload }) => ({
    ...state,
    product: payload
  }),
  [CHANGE_MAIN_IMAGE]: (state, { payload }) => ({
    ...state,
    mainImage: payload
  }),
  [CHANGE_CURRENT_SIZE]: (state, { payload }) => ({
    ...state,
    currentSize: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE,
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
