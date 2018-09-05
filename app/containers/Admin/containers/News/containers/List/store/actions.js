import {
  SET_OPERATIONS,
  SET_TAGS,
  APPEND_TAG,
  REMOVE_TAG,
  CHANGE_CURRENT_TAG,
  SET_FILTER_TAG,
  CHANGE_DATE,
  SET_OPERATION_FILTER_TYPE,
  SET_SHIFT,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  SET_IS_LOADING_TAG,
  CHANGE_PAGE,
  CHANGE_NUM_ON_PAGE,
  SET_TOTAL_RECORDS,
  RESET,
  RESET_FILTER,
} from './types';
import { api } from 'lib/api';
import { reset as resetReduxForm } from 'redux-form';
import { send } from 'containers/Notification/store/actions';
import { amountInput } from 'lib/amount';
import {
  removeEmpty,
  serializeParams
} from 'lib/utils';
import moment from 'moment';
import uuid from 'uuid/v1';
import _ from 'lodash';

export const setOperations = (value) => ({
  type: SET_OPERATIONS,
  payload: value,
});

export const setTags = (value) => ({
  type: SET_TAGS,
  payload: value,
});

export const changeDate = (value) => ({
  type: CHANGE_DATE,
  payload: value,
});

export const setOperationType = (value) => ({
  type: SET_OPERATION_FILTER_TYPE,
  payload: value,
});

export const appendTag = (value) => ({
  type: APPEND_TAG,
  payload: value,
});

export const removeTag = (value) => ({
  type: REMOVE_TAG,
  payload: value,
});

export const changePage = (value) => ({
  type: CHANGE_PAGE,
  payload: value,
});

export const setShift = (value) => ({
  type: SET_SHIFT,
  payload: value,
});

export const changeNumOnPage = (value) => ({
  type: CHANGE_NUM_ON_PAGE,
  payload: value,
});

export const setTotalRecords = (value) => ({
  type: SET_TOTAL_RECORDS,
  payload: value,
});

export const changeCurrentTag = (value) => ({
  type: CHANGE_CURRENT_TAG,
  payload: value,
});

export const setFilterTag = (value) => ({
  type: SET_FILTER_TAG,
  payload: value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const setIsLoadingTable = (value) => ({
  type: SET_IS_LOADING_TABLE,
  payload: value,
});

export const setIsLoadingTag = (value) => ({
  type: SET_IS_LOADING_TAG,
  payload: value,
});

export const resetOperationsList = () => ({ type: RESET });

export const pullTags = () => (dispatch, getState) => {
  const { tagName } = getState().Operations_List;

  if (tagName.length <= 0) return;

  dispatch(setIsLoadingTag(true));
  api.tags.get(tagName.toLowerCase(), 5)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(setFilterTag(data.data));
    })
    .finally(() => dispatch(setIsLoadingTag(false)));
};

export const pullOperations = (shiftParam) => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    page,
    num_on_page,
    shift
  } = getState().Operations_List;
  let s = shiftParam === false ? false : shift;

  if (shiftParam) {
    s = shiftParam;
    dispatch(setShift(shiftParam));
  }

  dispatch(setIsLoadingTable(true));
  api.operations.getList(page, num_on_page, '', s)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const { records, total_records } = data.data;

      dispatch(setOperations(records));
      dispatch(setTotalRecords(total_records));
      resolve();
    })
    .catch(() => reject())
    .finally(() => dispatch(setIsLoadingTable(false)));
});

export const resetFilterAction = () => ({ type: RESET_FILTER });

export const resetFilter = () => (dispatch) => {
  dispatch(resetReduxForm('Operations_Filter'));
  dispatch(resetFilterAction());
  dispatch(pullOperations(0));
};

export const applyFilter = (pageParam, numOnPageParam) => (dispatch, getState) => {
  const {
    form: {
      Operations_Filter: {
        syncError,
        values
      }
    },
    Operations_List: {
      tags,
      date,
      shift,
      page = pageParam,
      num_on_page = numOnPageParam
    }
  } = getState();

  if (syncError) return;

  const operationTags = tags.length !== 0 ? tags.map((tag) => tag.id) : undefined;

  const filter = {
    ...values,
    category: (values && values.category) ? values.category : undefined,
    sum_from: (values && values.sum_from) ? amountInput(values.sum_from.replace(/,/g, '')) : undefined,
    sum_to: (values && values.sum_to) ? amountInput(values.sum_to.replace(/,/g, '')) : undefined,
    has_files: (values && values.has_files !== undefined) ? values.has_files : undefined,
    tags: operationTags,
    date_from: date.date_from ? moment(date.date_from).startOf('day').unix() : undefined,
    date_to: date.date_to ? moment(date.date_to).endOf('day').unix() : undefined,
  };

  if (filter.sum_from > filter.sum_to) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Сумма "от" не может быть больше "до"', timeout: 1000 }));
    return;
  }

  const filter_data = serializeParams(removeEmpty(filter));

  dispatch(setIsLoading(true));
  dispatch(setIsLoadingTable(true));
  api.operations.getList(page, num_on_page, filter_data, shift)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      const { records, total_records } = data.data;

      dispatch(setOperations(records));
      dispatch(changePage(_.isNumber(pageParam) ? pageParam : 0));
      dispatch(setTotalRecords(total_records));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
      dispatch(setIsLoadingTable(false));
    });
};
