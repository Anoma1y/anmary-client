import {
  SET_PRODUCTS,
  CHANGE_PAGE,
  CHANGE_NUM_ON_PAGE,
  SET_TOTAL_RECORDS,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
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

export const setProducts = (value) => ({
  type: SET_PRODUCTS,
  payload: value,
});

export const changePage = (value) => ({
  type: CHANGE_PAGE,
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

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const setIsLoadingTable = (value) => ({
  type: SET_IS_LOADING_TABLE,
  payload: value,
});

export const resetProductsList = () => ({ type: RESET });

export const pullProducts = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    page,
    num_on_page,
  } = getState().Admin_Products_List;

  dispatch(setIsLoadingTable(true));
  api.product.getList(page, num_on_page, '')
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const { records, total_records } = data.data;

      dispatch(setProducts(records));
      dispatch(setTotalRecords(total_records));
      resolve();
    })
    .catch(() => reject())
    .finally(() => dispatch(setIsLoadingTable(false)));
});

export const resetFilterAction = () => ({ type: RESET_FILTER });

export const resetFilter = () => (dispatch) => {
  dispatch(resetReduxForm('Products_Filter'));
  dispatch(resetFilterAction());
  dispatch(pullProducts(0));
};

export const applyFilter = (pageParam, numOnPageParam) => (dispatch, getState) => {
  const {
    form: {
      Products_Filter: {
        syncError,
        values
      }
    },
    Admin_Products_List: {
      page = pageParam,
      num_on_page = numOnPageParam
    }
  } = getState();

  if (syncError) return;

  const filter = {
    ...values,
    has_discount: (values && values.has_discount !== undefined) ? values.has_discount : undefined,
    sum_from: (values && values.sum_from) ? amountInput(values.sum_from.replace(/,/g, '')) : undefined,
    sum_to: (values && values.sum_to) ? amountInput(values.sum_to.replace(/,/g, '')) : undefined,
  };

  if (filter.sum_from > filter.sum_to) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Сумма "от" не может быть больше "до"', timeout: 1000 }));
    return;
  }

  const filter_data = serializeParams(removeEmpty(filter));

  dispatch(setIsLoading(true));
  dispatch(setIsLoadingTable(true));
  api.product.getList(page, num_on_page, filter_data)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      const { records, total_records } = data.data;

      dispatch(setProducts(records));
      dispatch(changePage(_.isNumber(pageParam) ? pageParam : 0));
      dispatch(setTotalRecords(total_records));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
      dispatch(setIsLoadingTable(false));
    });
};
