import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  SET_IS_LOADING,
  SET_ERROR,
  RESET,
} from './types';

const INITIAL_STATE = {
  email: '',
  password: '',
  isLoading: false,
  error: ''
};

const HANDLERS = {
  [CHANGE_EMAIL]: (state, { payload }) => ({
    ...state,
    email: payload
  }),
  [CHANGE_PASSWORD]: (state, { payload }) => ({
    ...state,
    password: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
