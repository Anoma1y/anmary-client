import {
  SET_CURRENCY,
  SET_CATEGORY
} from './types';
import { api } from 'lib/api';

export const setCurrency = (value) => ({
  type: SET_CURRENCY,
  payload: value,
});

export const setCategory = (value) => ({
  type: SET_CATEGORY,
  payload: value,
});

export const pullCurrency = () => (dispatch) => new Promise((resolve, reject) => {
  api.currency.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setCurrency(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullCategory = () => (dispatch) => new Promise((resolve, reject) => {
  api.category.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setCategory(data.data));
      resolve();
    })
    .catch(() => reject());
});

