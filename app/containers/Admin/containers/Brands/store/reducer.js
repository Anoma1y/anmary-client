import {
  SET_BRANDS,
  APPEND_BRAND,
  CHANGE_ADD_BRAND,
  SET_BRAND,
  SET_IS_LOADING,
  SET_BRAND_INFO,
  CHANGE_BRAND_INFO,
  RESET_BRAND_ADD,
  RESET_BRAND_INFO,
  RESET
} from './types';

const INITIAL_STATE = {
  brands: [],
  brandInfo: {
    name: '',
    country: '',
    description: ''
  },
  addBrand: {
    name: '',
    country: '',
    description: ''
  },
  isLoading: false
};

const HANDLERS = {
  [SET_BRANDS]: (state, { payload }) => ({
    ...state,
    brands: payload
  }),
  [APPEND_BRAND]: (state, { payload }) => ({
    ...state,
    brands: [...state.brands, payload]
  }),
  [SET_BRAND_INFO]: (state, { payload }) => {
    const { name, country, description } = state.brands[payload];

    return {
      ...state,
      brandInfo: {
        name,
        country,
        description
      }
    };
  },
  [CHANGE_ADD_BRAND]: (state, { payload }) => ({
    ...state,
    addBrand: {
      ...state.addBrand,
      [payload.key]: payload.value
    }
  }),
  [SET_BRAND]: (state, { payload }) => {
    let oldBrands = [...state.brands];
    const newBrands = payload.data;

    oldBrands[payload.index] = newBrands;

    return {
      ...state,
      brands: oldBrands
    }
  },
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [CHANGE_BRAND_INFO]: (state, { payload }) => ({
    ...state,
    brandInfo: {
      ...state.brandInfo,
      [payload.key]: payload.value
    }
  }),
  [RESET_BRAND_ADD]: (state) => ({
    ...state,
    addBrand: INITIAL_STATE.addBrand
  }),
  [RESET_BRAND_INFO]: (state) => ({
    ...state,
    brandInfo: INITIAL_STATE.brandInfo
  }),
  [RESET]: () => ({
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
