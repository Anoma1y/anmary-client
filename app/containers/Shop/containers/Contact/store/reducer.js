import {
  SET_IS_LOADING,
  SET_IS_SENT
} from './types';

const INITIAL_STATE = {
  isLoading: false,
  isSent: false
};

const HANDLERS = {
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_IS_SENT]: (state, { payload }) => ({
    ...state,
    isSent: payload
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
