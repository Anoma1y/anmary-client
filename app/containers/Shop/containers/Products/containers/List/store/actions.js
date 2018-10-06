import {
  SET_PRODUCTS,
  SET_FILTER_PRICE,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  CHANGE_PAGE,
  CHANGE_NUM_ON_PAGE,
  CHANGE_FILTER_SORT,
  SET_TOTAL_RECORDS,

  CHANGE_FILTER_PRICE,

  SET_FILTER_VALUE,
  APPEND_FILTER_VALUE,
  REMOVE_FILTER_VALUE,

  RESET,
  RESET_FILTER,
} from './types';
import { api } from 'lib/api';
import { replace } from 'react-router-redux';
import {
  amountOutput,
  amountInput
} from 'lib/amount';
import {
  removeEmpty,
  parseParams,
  serializeParams
} from 'lib/utils';
import SortingData from 'lib/sorting';
import _ from 'lodash';

export const setProducts = (value) => ({
  type: SET_PRODUCTS,
  payload: value,
});

export const setFilterValue = (key, value) => ({
  type: SET_FILTER_VALUE,
  payload: {
    key,
    value
  },
});

export const appendFilterValue = (key, value) => ({
  type: APPEND_FILTER_VALUE,
  payload: {
    key,
    value
  },
});

export const removeFilterValue = (key, value) => ({
  type: REMOVE_FILTER_VALUE,
  payload: {
    key,
    value
  },
});

export const changePage = (value) => ({
  type: CHANGE_PAGE,
  payload: value,
});

export const changeFilterSort = (value) => ({
  type: CHANGE_FILTER_SORT,
  payload: value,
});

export const setFilterPrice = (value) => ({
  type: SET_FILTER_PRICE,
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

export const changeFilterPrice = (key, value) => ({
  type: CHANGE_FILTER_PRICE,
  payload: {
    key,
    value
  },
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

export const pullProducts = (params) => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    page,
    num_on_page,
  } = getState().Shop_Products_List;

  const filter = serializeParams(parseParams(params));

  dispatch(setIsLoadingTable(true));
  api.product.getList(page, num_on_page, filter)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const {
        records,
        total_records,
        max_price,
        min_price
      } = data.data;

      const initFilterPrice = {
        max: amountOutput(max_price).value,
        min: 0
        // min: amountOutput(min_price).value
      };

      dispatch(setFilterPrice(initFilterPrice));

      dispatch(setProducts(records));
      dispatch(setTotalRecords(total_records));
      resolve();
    })
    .catch(() => reject())
    .finally(() => dispatch(setIsLoadingTable(false)));
});

export const resetFilterAction = () => ({ type: RESET_FILTER });

export const resetFilter = () => (dispatch, getState) => {
  dispatch(resetFilterAction());
  dispatch(pullProducts(''));
  if (getState().routing.location.search) {
    dispatch(replace('/product'));
  }
};

export const applyFilter = (pageParam, numOnPageParam, sortingId) => (dispatch, getState) => {
  const {
    num_on_page = numOnPageParam,
    filter_category,
    filter_brand,
    filter_season,
    filter_size,
    filter_composition,
    filter_price,
    sorting = sortingId,
  } = getState().Shop_Products_List;
  const { search } = getState().routing.location;

  const filter = {
    ...parseParams(search),
    category: filter_category.length !== 0 ? filter_category : null,
    brand: filter_brand.length !== 0 ? filter_brand : null,
    season: filter_season.length !== 0 ? filter_season : null,
    size: filter_size.length !== 0 ? filter_size : null,
    composition: filter_composition.length !== 0 ? filter_composition : null,
    sort: _.find(SortingData, { id: Number(sorting) }).order,
    type_order: _.find(SortingData, { id: Number(sorting) }).type,
    sum_from: typeof filter_price.min === 'number' ? amountInput(filter_price.min) : amountInput(filter_price.min.replace(/,/g, '')),
    sum_to: typeof filter_price.max === 'number' ? amountInput(filter_price.max) : amountInput(filter_price.max.replace(/,/g, '')),
  };

  const filter_data = serializeParams(removeEmpty(filter));

  dispatch(setIsLoading(true));
  api.product.getList(pageParam, num_on_page, filter_data)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      const { records, total_records } = data.data;

      dispatch(setProducts(records));
      dispatch(changePage(_.isNumber(pageParam) ? pageParam : 0));
      dispatch(setTotalRecords(total_records));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};
