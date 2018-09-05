import {
  SET_TAGS,
  SET_FILTER_TAG,
  APPEND_TAG,
  REMOVE_TAG,
  CHANGE_CURRENT_TAG,
  SET_OPERATION,
  SET_OPERATION_TYPE,
  SET_IS_LOADING,
  SET_IS_LOADING_TAG,
  SET_FILES,
  APPEND_FILE,
  REMOVE_FILE,
  RESET,
} from './types';
import _ from 'lodash';

const INITIAL_STATE = {
  tags: [],
  files: [],
  filterTag: [],
  tagName: '',
  operation_type: 0,
  isLoading: false,
  isLoadingTag: false,
  operation: {}
};

const HANDLERS = {
  [SET_TAGS]: (state, { payload }) => ({
    ...state,
    tags: payload
  }),
  [SET_OPERATION]: (state, { payload }) => ({
    ...state,
    operation: payload
  }),
  [APPEND_TAG]: (state, { payload }) => {
    const tags = [...state.tags, payload];
    const newTags = _.uniqBy(tags, 'id');

    return {
      ...state,
      tags: newTags
    };
  },
  [SET_OPERATION_TYPE]: (state, { payload }) => ({
    ...state,
    operation_type: payload
  }),
  [SET_FILES]: (state, { payload }) => ({
    ...state,
    files: payload
  }),
  [APPEND_FILE]: (state, { payload }) => ({
    ...state,
    files: [...state.files, payload]
  }),
  [REMOVE_FILE]: (state, { payload }) => ({
    ...state,
    files: state.files.filter((file) => file.id !== payload)
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
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_IS_LOADING_TAG]: (state, { payload }) => ({
    ...state,
    isLoadingTag: payload
  }),
  [RESET]: () => ({
    ...INITIAL_STATE,
  }),
};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
