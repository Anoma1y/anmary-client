import {
  SET_PRODUCT,
  RESET,
} from './types';
import { api } from 'lib/api';

export const setProduct = (value) => ({
  type: SET_PRODUCT,
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
