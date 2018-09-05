import {
  SET_OPERATIONS,
  SET_TAGS,
  APPEND_TAG,
  REMOVE_TAG,
  CHANGE_CURRENT_TAG,
  SET_FILTER_TAG,
  CHANGE_DATE,
  CHANGE_PAGE,
  CHANGE_NUM_ON_PAGE,
  SET_TOTAL_RECORDS,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  SET_OPERATION_FILTER_TYPE,
  SET_IS_LOADING_TAG,
  SET_SHIFT,
  RESET,
  RESET_FILTER,
} from './types';
import _ from 'lodash';

const INITIAL_FILTER = {
  tags: [],
  filterTag: [],
  tagName: '',
  page: 0,
  num_on_page: 10,
  total_records: 0,
  operation_type: 0,
  date: {
    date_from: null,
    date_to: null,
  },
};

const INITIAL_STATE = {
  operations: [],
  isLoading: false,
  isLoadingTable: false,
  isLoadingTag: false,
  shift: false,
  ...INITIAL_FILTER
};

const HANDLERS = {
  [SET_OPERATIONS]: (state, { payload }) => ({
    ...state,
    operations: payload
  }),
  [SET_TAGS]: (state, { payload }) => ({
    ...state,
    tags: payload
  }),
  [SET_SHIFT]: (state, { payload }) => ({
    ...state,
    shift: payload
  }),
  [APPEND_TAG]: (state, { payload }) => {
    const tags = [...state.tags, payload];
    const newTags = _.uniqBy(tags, 'id');

    return {
      ...state,
      tags: newTags
    }
  },
  [SET_OPERATION_FILTER_TYPE]: (state, { payload }) => ({
    ...state,
    operation_type: payload
  }),
  [REMOVE_TAG]: (state, { payload }) => ({
    ...state,
    tags: [...state.tags].filter((tag) => tag.id !== payload)
  }),
  [SET_FILTER_TAG]: (state, { payload }) => ({
    ...state,
    filterTag: payload
  }),
  [CHANGE_CURRENT_TAG]: (state, { payload }) => ({
    ...state,
    tagName: payload
  }),
  [CHANGE_DATE]: (state, { payload }) => ({
    ...state,
    date: payload
  }),
  [CHANGE_PAGE]: (state, { payload }) => ({
    ...state,
    page: payload
  }),
  [CHANGE_NUM_ON_PAGE]: (state, { payload }) => ({
    ...state,
    num_on_page: payload
  }),
  [SET_TOTAL_RECORDS]: (state, { payload }) => ({
    ...state,
    total_records: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_IS_LOADING_TABLE]: (state, { payload }) => ({
    ...state,
    isLoadingTable: payload
  }),
  [SET_IS_LOADING_TAG]: (state, { payload }) => ({
    ...state,
    isLoadingTag: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
  [RESET_FILTER]: (state) => ({
    ...state,
    ...INITIAL_FILTER
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
