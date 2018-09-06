import {
  SET_SEASONS,
  APPEND_SEASON,
  CHANGE_ADD_SEASON,
  SET_SEASON,
  SET_IS_LOADING,
  SET_SEASON_INFO,
  CHANGE_SEASON_INFO,
  RESET_SEASON_ADD,
  RESET_SEASON_INFO,
  RESET
} from './types';

const INITIAL_STATE = {
  seasons: [],
  seasonInfo: {
    name: '',
    description: ''
  },
  addSeason: {
    name: '',
    description: ''
  },
  isLoading: false
};

const HANDLERS = {
  [SET_SEASONS]: (state, { payload }) => ({
    ...state,
    seasons: payload
  }),
  [APPEND_SEASON]: (state, { payload }) => ({
    ...state,
    seasons: [...state.seasons, payload]
  }),
  [SET_SEASON_INFO]: (state, { payload }) => {
    const { name, description } = state.seasons[payload];

    return {
      ...state,
      seasonInfo: {
        name,
        description
      }
    };
  },
  [CHANGE_ADD_SEASON]: (state, { payload }) => ({
    ...state,
    addSeason: {
      ...state.addSeason,
      [payload.key]: payload.value
    }
  }),
  [SET_SEASON]: (state, { payload }) => {
    let oldSeasons = [...state.seasons];
    const newSeasons = payload.data;

    oldSeasons[payload.index] = newSeasons;

    return {
      ...state,
      seasons: oldSeasons
    }
  },
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [CHANGE_SEASON_INFO]: (state, { payload }) => ({
    ...state,
    seasonInfo: {
      ...state.seasonInfo,
      [payload.key]: payload.value
    }
  }),
  [RESET_SEASON_ADD]: (state) => ({
    ...state,
    addSeason: INITIAL_STATE.addSeason
  }),
  [RESET_SEASON_INFO]: (state) => ({
    ...state,
    seasonInfo: INITIAL_STATE.seasonInfo
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
