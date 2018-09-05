import {
  SET_CATEGORIES,
  APPEND_CATEGORY,
  CHANGE_ADD_CATEGORY,
  SET_CATEGORY,
  SET_IS_LOADING,
  SET_CATEGORY_INFO,
  CHANGE_CATEGORY_INFO,
  RESET_CATEGORY_ADD,
  RESET_CATEGORY_INFO,
  RESET
} from './types';

const INITIAL_STATE = {
  categories: [],
  categoryInfo: {
    name: '',
    description: ''
  },
  addCategory: {
    name: '',
    description: ''
  },
  isLoading: false
};

const HANDLERS = {
  [SET_CATEGORIES]: (state, { payload }) => ({
    ...state,
    categories: payload
  }),
  [APPEND_CATEGORY]: (state, { payload }) => ({
    ...state,
    categories: [...state.categories, payload]
  }),
  [SET_CATEGORY_INFO]: (state, { payload }) => {
    const { name, description } = state.categories[payload];

    return {
      ...state,
      categoryInfo: {
        name,
        description
      }
    };
  },
  [CHANGE_ADD_CATEGORY]: (state, { payload }) => ({
    ...state,
    addCategory: {
      ...state.addCategory,
      [payload.key]: payload.value
    }
  }),
  [SET_CATEGORY]: (state, { payload }) => {
    let oldCategories = [...state.categories];
    const newCategories = payload.data;

    oldCategories[payload.index] = newCategories;

    return {
      ...state,
      categories: oldCategories
    }
  },
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [CHANGE_CATEGORY_INFO]: (state, { payload }) => ({
    ...state,
    categoryInfo: {
      ...state.categoryInfo,
      [payload.key]: payload.value
    }
  }),
  [RESET_CATEGORY_ADD]: (state) => ({
    ...state,
    addCategory: INITIAL_STATE.addCategory
  }),
  [RESET_CATEGORY_INFO]: (state) => ({
    ...state,
    categoryInfo: INITIAL_STATE.categoryInfo
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
