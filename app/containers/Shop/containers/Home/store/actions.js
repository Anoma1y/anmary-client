import {
  SET_PRODUCTS,
  CHANGE_SUBSCRIBE_CONTACT,
  SET_SUBSCRIBE_ERROR,
  SET_IS_LOADING,
  RESET,
} from './types';
import { api } from 'lib/api';
import {
  removeEmpty,
  serializeParams
} from 'lib/utils';

export const setProducts = (value) => ({
  type: SET_PRODUCTS,
  payload: value,
});

export const changeSubscribeContact = (value) => ({
  type: CHANGE_SUBSCRIBE_CONTACT,
  payload: value,
});

export const setSubscribeError = (value) => ({
  type: SET_SUBSCRIBE_ERROR,
  payload: value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const resetProductsList = () => ({ type: RESET });

export const applySubscribe = () => (dispatch, getState) => {
  console.log(1)
};

export const pullProducts = () => (dispatch) => new Promise((resolve, reject) => {
  const filter = {
    is_available: 1,
  };
  const filter_data = serializeParams(removeEmpty(filter));

  dispatch(setIsLoading(true));
  api.product.getListV1(filter_data, 4)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(setProducts(data.data));
      resolve();
    })
    .catch(() => reject())
    .finally(() => dispatch(setIsLoading(false)));
});
