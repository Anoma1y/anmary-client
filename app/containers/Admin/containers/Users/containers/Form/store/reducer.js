import {
  SET_IS_LOADING,
  SET_USER,
  SET_ROLES,
  RESET,
} from './types';

const INITIAL_STATE = {
  user: {
    name: '',
    email: '',
    phone: '',
    role_id: 0,
    status: 0,
  },
  roles: [],
  isLoading: false
};

const HANDLERS = {
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_USER]: (state, { payload }) => ({
    ...state,
    user: payload
  }),
  [SET_ROLES]: (state, { payload }) => ({
    ...state,
    roles: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
