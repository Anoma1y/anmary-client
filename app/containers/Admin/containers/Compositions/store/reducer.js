import {
  SET_COMPOSITIONS,
  APPEND_COMPOSITION,
  CHANGE_ADD_COMPOSITION,
  SET_COMPOSITION,
  SET_IS_LOADING,
  SET_COMPOSITION_INFO,
  CHANGE_COMPOSITION_INFO,
  RESET_COMPOSITION_ADD,
  RESET_COMPOSITION_INFO,
  RESET
} from './types';

const INITIAL_STATE = {
  compositions: [],
  compositionInfo: {
    name: '',
    description: ''
  },
  addComposition: {
    name: '',
    description: ''
  },
  isLoading: false
};

const HANDLERS = {
  [SET_COMPOSITIONS]: (state, { payload }) => ({
    ...state,
    compositions: payload
  }),
  [APPEND_COMPOSITION]: (state, { payload }) => ({
    ...state,
    compositions: [...state.compositions, payload]
  }),
  [SET_COMPOSITION_INFO]: (state, { payload }) => {
    const { name, description } = state.compositions[payload];

    return {
      ...state,
      compositionInfo: {
        name,
        description
      }
    };
  },
  [CHANGE_ADD_COMPOSITION]: (state, { payload }) => ({
    ...state,
    addComposition: {
      ...state.addComposition,
      [payload.key]: payload.value
    }
  }),
  [SET_COMPOSITION]: (state, { payload }) => {
    let oldCompositions = [...state.compositions];
    const newCompositions = payload.data;

    oldCompositions[payload.index] = newCompositions;

    return {
      ...state,
      compositions: oldCompositions
    }
  },
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [CHANGE_COMPOSITION_INFO]: (state, { payload }) => ({
    ...state,
    compositionInfo: {
      ...state.compositionInfo,
      [payload.key]: payload.value
    }
  }),
  [RESET_COMPOSITION_ADD]: (state) => ({
    ...state,
    addComposition: INITIAL_STATE.addComposition
  }),
  [RESET_COMPOSITION_INFO]: (state) => ({
    ...state,
    compositionInfo: INITIAL_STATE.compositionInfo
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
