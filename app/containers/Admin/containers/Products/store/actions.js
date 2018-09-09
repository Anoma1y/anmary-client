import {
  SET_BRANDS,
  SET_CATEGORIES,
  SET_SEASONS,
  SET_SIZES,
  SET_COMPOSITIONS,
} from './types';
import { api } from 'lib/api';

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

export const pullSizes = () => (dispatch) => new Promise((resolve, reject) => {
  api.size.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setSizes(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullCompositions = () => (dispatch) => new Promise((resolve, reject) => {
  api.composition.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setCompositions(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullCategories = () => (dispatch) => new Promise((resolve, reject) => {
  api.category.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setCategories(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullBrands = () => (dispatch) => new Promise((resolve, reject) => {
  api.brand.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setBrands(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullSeasons = () => (dispatch) => new Promise((resolve, reject) => {
  api.season.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setSeasons(data.data));
      resolve();
    })
    .catch(() => reject());
});

