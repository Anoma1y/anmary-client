import {
  SET_BRANDS,
  SET_CATEGORIES,
  SET_SEASONS,
  SET_SIZES,
  SET_COMPOSITIONS,
  RESET_PRODUCTS,
} from './types';
import { api } from 'lib/api';
import Storage from 'lib/storage';

export const setCategories = (value) => ({
  type: SET_CATEGORIES,
  payload: value,
});

export const setBrands = (value) => ({
  type: SET_BRANDS,
  payload: value,
});

export const setSeasons = (value) => ({
  type: SET_SEASONS,
  payload: value,
});

export const setSizes = (value) => ({
  type: SET_SIZES,
  payload: value,
});

export const setCompositions = (value) => ({
  type: SET_COMPOSITIONS,
  payload: value,
});

export const resetProducts = () => ({ type: RESET_PRODUCTS });

export const setStorageData = () => (dispatch, getState) => new Promise((resolve, reject) => {

  dispatch(setSizes(Storage.get('product_sizes')));
  dispatch(setCompositions(Storage.get('product_compositions')));
  dispatch(setCategories(Storage.get('product_categories')));
  dispatch(setBrands(Storage.get('product_brands')));
  dispatch(setSeasons(Storage.get('product_seasons')));

  const {
    brands,
    seasons,
    categories,
    sizes,
    compositions
  } = getState().Shop_Products;
  let reject_time = 0;

  const time = setInterval(() => {

    try {
      if (brands.length !== 0 && seasons.length !== 0 && categories.length !== 0 && sizes.length !== 0 && compositions.length !== 0) {
        clearInterval(time);
        resolve();
      }

      if (reject_time > 20) {
        reject();
      }

      reject_time += 1;

    } catch (e) {
      clearInterval(time);
      reject(e);
    }
  }, 100);
});

export const pullSizes = () => (dispatch) => new Promise((resolve, reject) => {
  api.size.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      Storage.set('product_sizes', data.data);
      dispatch(setSizes(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullCompositions = () => (dispatch) => new Promise((resolve, reject) => {
  api.composition.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      Storage.set('product_compositions', data.data);
      dispatch(setCompositions(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullCategories = () => (dispatch) => new Promise((resolve, reject) => {
  api.category.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      Storage.set('product_categories', data.data);
      dispatch(setCategories(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullBrands = () => (dispatch) => new Promise((resolve, reject) => {
  api.brand.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      Storage.set('product_brands', data.data);
      dispatch(setBrands(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullSeasons = () => (dispatch) => new Promise((resolve, reject) => {
  api.season.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      Storage.set('product_seasons', data.data);
      dispatch(setSeasons(data.data));
      resolve();
    })
    .catch(() => reject());
});

