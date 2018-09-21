import {
  SET_PRODUCTS,
  SET_FILTER_PRICE,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  CHANGE_PAGE,
  CHANGE_NUM_ON_PAGE,
  CHANGE_FILTER_SORT,
  SET_TOTAL_RECORDS,
  CHANGE_FILTER_CATEGORY_ID,
  CHANGE_FILTER_BRAND_ID,
  CHANGE_FILTER_SEASON_ID,
  CHANGE_FILTER_SIZE_ID,
  CHANGE_FILTER_COMPOSITION_ID,
  CHANGE_FILTER_PRICE,
  RESET,
  RESET_FILTER,
} from './types';
import { api } from 'lib/api';
import { reset as resetReduxForm } from 'redux-form';
import { send } from 'containers/Notification/store/actions';
import {
  amountOutput,
  amountInput
} from 'lib/amount';
import {
  removeEmpty,
  serializeParams
} from 'lib/utils';
import SortingData from 'lib/sorting';
import _ from 'lodash';

export const setProducts = (value) => ({
  type: SET_PRODUCTS,
  payload: value,
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

export const changeFilterCategoryId = (value) => ({
  type: CHANGE_FILTER_CATEGORY_ID,
  payload: value,
});

export const changeFilterBrandId = (value) => ({
  type: CHANGE_FILTER_BRAND_ID,
  payload: value,
});

export const changeFilterSeasonId = (value) => ({
  type: CHANGE_FILTER_SEASON_ID,
  payload: value,
});

export const changeFilterSizeId = (value) => ({
  type: CHANGE_FILTER_SIZE_ID,
  payload: value,
});

export const changeFilterCompositionId = (value) => ({
  type: CHANGE_FILTER_COMPOSITION_ID,
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

export const pullProducts = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    page,
    num_on_page,
  } = getState().Shop_Products_List;

  dispatch(setIsLoadingTable(true));
  api.product.getList(page, num_on_page, '')
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
        min: amountOutput(min_price).value
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

export const resetFilter = () => (dispatch) => {
  dispatch(resetFilterAction());
  dispatch(pullProducts(0));
};

export const applyFilter = (pageParam, numOnPageParam, sortingId) => (dispatch, getState) => {
  const {
    page = pageParam,
    num_on_page = numOnPageParam,
    category_id,
    brand_id,
    season_id,
    size_id,
    composition_id,
    filter_price,
    sorting = sortingId,
  } = getState().Shop_Products_List;

  const filter = {
    category: category_id,
    brand: brand_id,
    season: season_id,
    size: size_id,
    composition: composition_id,
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
