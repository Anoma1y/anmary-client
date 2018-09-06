import {
  SET_BRAND,
  SET_BRANDS,
  APPEND_BRAND,
  CHANGE_ADD_BRAND,
  CHANGE_BRAND_INFO,
  SET_BRAND_INFO,
  RESET_BRAND_INFO,
  RESET_BRAND_ADD,
  SET_IS_LOADING,
  RESET,
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setBrands = (value) => ({
  type: SET_BRANDS,
  payload: value,
});

export const setBrand = (index, data) => ({
  type: SET_BRAND,
  payload: {
    index,
    data
  },
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const changeBrandInfo = (key, value) => ({
  type: CHANGE_BRAND_INFO,
  payload: {
    key,
    value
  },
});

export const appendBrand = (value) => ({
  type: APPEND_BRAND,
  payload: value,
});

export const changeAddBrand = (key, value) => ({
  type: CHANGE_ADD_BRAND,
  payload: {
    key,
    value
  },
});

export const setBrandInfo = (value) => ({
  type: SET_BRAND_INFO,
  payload: value,
});

export const resetBrandsList = () => ({ type: RESET });

export const resetBrandInfo = () => ({ type: RESET_BRAND_INFO });

export const resetBrandAdd = () => ({ type: RESET_BRAND_ADD });

export const pullBrands = () => (dispatch) => new Promise((resolve, reject) => {
  api.brand.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setBrands(data.data));
      resolve();
    })
    .catch(() => reject());
})

export const addNewBrand = () => (dispatch, getState) => {
  const { name, description, country } = getState().Admin_Brands.addBrand;

  if (name.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните имя категории', timeout: 1000 }));
    return;
  }

  dispatch(setIsLoading(true));
  api.brand.add(name, description, country)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(resetBrandAdd());
      dispatch(appendBrand(data.data));
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Бренд ${name} был добавлена`, timeout: 1000 }));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const applyBrandName = (index) => (dispatch, getState) => {
  const {
    brandInfo: {
      name,
      description,
      country
    },
    brands
  } = getState().Admin_Brands;
  const brand = brands[index];

  const editBrand = {
    name: name === '' ? brand.name : name,
    country,
    description: description === brand.description ? brand.description : description,
  };

  if (editBrand.name === brand.name && editBrand.description === brand.description && editBrand.country === brand.country) return;

  if (editBrand.name.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните имя бренда', timeout: 1000 }));
    return;
  }

  dispatch(setIsLoading(true));
  api.brand.edit(brand.id, editBrand.name, editBrand.description, editBrand.country)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(setBrand(index, data.data));
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Бренд ${brand.name} был изменена`, timeout: 1000 }));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
