import {
  SET_PRODUCT,
  CHANGE_MAIN_IMAGE,
  CHANGE_CURRENT_SIZE,
  RESET,
} from './types';
import { api } from 'lib/api';

export const setProduct = (value) => ({
  type: SET_PRODUCT,
  payload: value,
});

export const changeMainImage = (value) => ({
  type: CHANGE_MAIN_IMAGE,
  payload: value,
});

export const changeCurrentSize = (value) => ({
  type: CHANGE_CURRENT_SIZE,
  payload: value,
});

export const resetProductSingle = () => ({ type: RESET });

export const pullProduct = (product_id) => (dispatch) => new Promise((resolve, reject) => {
  api.product.getSingle(product_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setProduct(data.data));
      resolve();
    })
    .catch(() => reject());
});
