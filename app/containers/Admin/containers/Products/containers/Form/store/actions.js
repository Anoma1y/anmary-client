import {
  APPEND_COMPOSITION,
  APPEND_SIZE,
  REMOVE_SIZE,
  REMOVE_COMPOSITION,
  SET_SIZES,
  SET_COMPOSITIONS,
  SET_PRODUCT,
  SET_IS_LOADING,
  SET_IMAGES,
  APPEND_IMAGE,
  REMOVE_IMAGE,
  RESET,

  SET_SIZES_USED,
  SET_SIZES_AVAILABLE,
  CHANGE_CURRENT_SIZE,
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import {
  amountInput,
  amountOutput
} from 'lib/amount';
import uuid from 'uuid/v1';
import _ from 'lodash';

export const setProduct = (value) => ({
  type: SET_PRODUCT,
  payload: value,
});

export const setImages = (value) => ({
  type: SET_IMAGES,
  payload: value,
});

export const setCompositions = (value) => ({
  type: SET_COMPOSITIONS,
  payload: value,
});

export const appendComposition = (value) => ({
  type: APPEND_COMPOSITION,
  payload: value,
});

export const removeComposition = (value) => ({
  type: REMOVE_COMPOSITION,
  payload: value,
});

export const setSizes = (value) => ({
  type: SET_SIZES,
  payload: value,
});

export const appendSize = (value) => ({
  type: APPEND_SIZE,
  payload: value,
});

export const removeSize = (value) => ({
  type: REMOVE_SIZE,
  payload: value,
});

export const changeCurrentSize = (value) => ({
  type: CHANGE_CURRENT_SIZE,
  payload: value,
});

export const setSizesUsed = (value) => ({
  type: SET_SIZES_USED,
  payload: value,
});

export const setSizesAvailable = (value) => ({
  type: SET_SIZES_AVAILABLE,
  payload: value,
});

export const appendImage = (value) => ({
  type: APPEND_IMAGE,
  payload: value,
});

export const removeImage = (value) => ({
  type: REMOVE_IMAGE,
  payload: value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const resetFormProduct = () => ({ type: RESET });

export const pullSizes = () => (dispatch) => new Promise((resolve, reject) => {
  api.size.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setSizes(data.data));
      dispatch(setSizesAvailable(data.data.map((it) => it.id)));
      resolve();
    })
    .catch(() => reject());
});

export const addSizeProduct = () => (dispatch, getState) => {
  const { sizes, sizesUsed, currentSize } = getState().Products_Form;

  if (currentSize === '') return;

  api.proportion.add(Number(currentSize))
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      const getId = sizes.map((it) => it.id);

      const newSizesUsed = [...sizesUsed, Number(currentSize)];
      const newSizesAvailable = _.difference(getId, newSizesUsed);

      dispatch(changeCurrentSize(''));
      dispatch(setSizesUsed(newSizesUsed));
      dispatch(setSizesAvailable(newSizesAvailable));
      dispatch(appendSize(data.data));

    })
    .catch(() => console.log('err'));
};

export const removeSizeProduct = (index) => (dispatch, getState) => {
  const { sizesProduct, sizesUsed, sizesAvailable } = getState().Products_Form;

  const { size_id } = sizesProduct[index];

  const newSizeUsed = sizesUsed.filter((item) => item !== size_id);
  const newSizeAvailable = [...sizesAvailable, size_id].sort((a, b) => a - b);

  dispatch(changeCurrentSize(''));
  dispatch(setSizesUsed(newSizeUsed));
  dispatch(setSizesAvailable(newSizeAvailable));
  dispatch(removeSize(size_id));
};

export const pullCompositions = () => (dispatch) => new Promise((resolve, reject) => {
  api.composition.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setCompositions(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const pullProduct = (product_id) => (dispatch) => new Promise((resolve, reject) => {
  api.product.getSingle(product_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const product = {
        id: data.data.id,
        name: data.data.name,
        description: data.data.description,
        category: data.data.category.id,
        brand: data.data.brand.id,
        season: data.data.season.id,
        price: String(amountOutput(data.data.price).value),
        total_price: String(amountOutput(data.data.total_price).value),
      };

      dispatch(setImages(data.data.image));
      dispatch(setProduct(product));
      resolve();
    })
    .catch(() => reject());
});

export const uploadImage = (formData) => (dispatch) => {

  dispatch(setIsLoading(true));
  api.images.add(formData)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(appendImage(data.data));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка загрузки изображения', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addProduct = () => (dispatch, getState) => {
  const {
    form: {
      Products_Form: {
        values,
        syncError
      }
    },
    Products_Form: {
      tags,
      files
    }
  } = getState();

  if (syncError || !values || !values.type || !values.category || !values.currency) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните все необходимые поля формы', timeout: 2500 }));
    return;
  }

  const productTags = tags.length !== 0 ? tags.map((tag) => tag.id) : [];
  const productImages = files.length !== 0 ? files.map((file) => file.id) : [];

  const product = {
    ...values,
    sum: amountInput(values.sum.replace(/,/g, '')),
    tags: productTags,
    files: productImages
  };

  dispatch(setIsLoading(true));
  api.products.add(product)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: 'Товар был успешно добавлен', timeout: 2500 }));
      dispatch(replace('/products/products/'));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка добавления новой товара', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};

export const editProduct = () => (dispatch, getState) => {
  const {
    form: {
      Products_Form: {
        values,
        syncError
      }
    },
    Products_Form: {
      tags,
      files,
      product: editProduct
    }
  } = getState();

  if (syncError || !values || !values.type || !values.category || !values.currency) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните все необходимые поля формы', timeout: 2500 }));
    return;
  }

  const productTags = tags.length !== 0 ? tags.map((tag) => tag.id) : [];
  const productImages = files.length !== 0 ? files.map((file) => file.id) : [];

  const product = {
    ...values,
    sum: amountInput(values.sum.replace(/,/g, '')),
    tags: productTags,
    files: productImages
  };

  dispatch(setIsLoading(true));
  api.products.edit(editProduct.id, product)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Товар ${editProduct.id} был успешно изменен`, timeout: 2500 }));
      dispatch(replace(`/products/products/${editProduct.id}`));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка изменения товара', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};
