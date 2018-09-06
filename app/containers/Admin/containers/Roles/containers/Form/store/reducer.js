import {
  SET_ROLE,
  CHANGE_ROLE,
  CHANGE_PERMISSION,
  SET_ROLES,
  SET_SCHEMA,
  SET_IS_LOADING,
  RESET,
} from './types';

const INITIAL_STATE = {
  roles: [],
  role: {
    id: 0,
    name: '',
    display_name: '',
    description: '',
    permissions: []
  },
  schema: {},
  isLoading: false
}

const HANDLERS = {
  [CHANGE_ROLE]: (state, { payload }) => ({
    ...state,
    role: {
      ...state.role,
      [payload.key]: payload.value
    }
  }),
  [CHANGE_PERMISSION]: (state, { payload }) => ({
    ...state,
    role: {
      ...state.role,
      permissions: (state.role.permissions.includes(payload.key) && !payload.active) ?
        (state.role.permissions.filter(item => item !== payload.key))
        : ([...state.role.permissions, payload.key])
    }
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_ROLE]: (state, { payload }) => ({
    ...state,
    role: payload
  }),
  [SET_ROLES]: (state, { payload }) => ({
    ...state,
    roles: payload
  }),
  [SET_SCHEMA]: (state, { payload }) => ({
    ...state,
    schema: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
