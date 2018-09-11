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
  SET_COMPOSITIONS_PRODUCT,
  SET_SIZES_PRODUCT,
  SET_COMPOSITIONS_USED,
  SET_COMPOSITIONS_AVAILABLE,
  CHANGE_CURRENT_COMPOSITION,
  CHANGE_COMPOSITION_vALUE,
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

export const setCompositionsProduct = (value) => ({
  type: SET_COMPOSITIONS_PRODUCT,
  payload: value,
});

export const setSizesProduct = (value) => ({
  type: SET_SIZES_PRODUCT,
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

export const changeCurrentComposition = (value) => ({
  type: CHANGE_CURRENT_COMPOSITION,
  payload: value,
});

export const setCompositionsUsed = (value) => ({
  type: SET_COMPOSITIONS_USED,
  payload: value,
});

export const setCompositionsAvailable = (value) => ({
  type: SET_COMPOSITIONS_AVAILABLE,
  payload: value,
});

export const changeCompositionValue = (value) => ({
  type: CHANGE_COMPOSITION_vALUE,
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
      dispatch(setCompositionsAvailable(data.data.map((it) => it.id)));
      resolve();
    })
    .catch(() => reject());
});

export const addCompositionProduct = () => (dispatch, getState) => {
  const { compositions, compositionsUsed, currentComposition, currentComposition_Value } = getState().Products_Form;

  if (currentComposition === '' || !/^\d+$/.test(currentComposition_Value)) return;

  api.compound.add(Number(currentComposition), currentComposition_Value)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      const getId = compositions.map((it) => it.id);

      const newCompositionsUsed = [...compositionsUsed, Number(currentComposition)];
      const newCompositionsAvailable = _.difference(getId, newCompositionsUsed);

      dispatch(changeCurrentComposition(''));
      dispatch(changeCompositionValue(0));
      dispatch(setCompositionsUsed(newCompositionsUsed));
      dispatch(setCompositionsAvailable(newCompositionsAvailable));
      dispatch(appendComposition(data.data));

    })
    .catch(() => console.log('err'));
};

export const removeCompositionProduct = (index) => (dispatch, getState) => {
  const { compositionsProduct, compositionsUsed, compositionsAvailable } = getState().Products_Form;

  const { composition_id } = compositionsProduct[index];

  const newCompositionUsed = compositionsUsed.filter((item) => item !== composition_id);
  const newCompositionAvailable = [...compositionsAvailable, composition_id].sort((a, b) => a - b);

  dispatch(changeCurrentComposition(''));
  dispatch(setCompositionsUsed(newCompositionUsed));
  dispatch(setCompositionsAvailable(newCompositionAvailable));
  dispatch(removeComposition(composition_id));
};

export const pullProduct = (product_id) => (dispatch, getState) => new Promise((resolve, reject) => {

  const { sizes, sizesUsed, newSizesAvailable } = getState().Products_Form;

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
        discount: data.data.discount,
      };

      dispatch(setImages(data.data.images));
      dispatch(setCompositionsProduct(data.data.compositions));
      // todo сделать пулл размеров и составов в самом начале
      const getId = sizes.map((it) => it.id);
      const sizesUsedId = data.data.sizes.map((it) => it.size_id);
      //
      const newSizesAvailable = _.difference(getId, sizesUsedId);
      console.log(sizesUsedId)
      console.log(newSizesAvailable)
      dispatch(setSizesAvailable(newSizesAvailable));
      dispatch(setSizesUsed(sizesUsedId))

      dispatch(setSizesProduct(data.data.sizes));
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
      sizesProduct,
      compositionsProduct,
      images
    }
  } = getState();

  if (syncError
    || !values
    || !values.price
    || !values.discount
    || !values.category
    || !values.season
    || !values.brand
    || images.length === 0
    || compositionsProduct.length === 0
    || sizesProduct.length === 0

  ) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните все необходимые поля формы', timeout: 2500 }));
    return;
  }

  const productSizes = sizesProduct.map((size) => size.id);
  const productCompositions = compositionsProduct.map((composition) => composition.id);
  const productImages = images.map((image) => image.id);

  const product = {
    ...values,
    category_id: Number(values.category),
    brand_id: Number(values.brand),
    season_id: Number(values.season),
    price: amountInput(values.price.replace(/,/g, '')),
    discount: Number(values.discount.replace(/,/g, '')),
    size: productSizes,
    image: productImages,
    composition: productCompositions
  };

  dispatch(setIsLoading(true));
  api.product.add(product)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: 'Товар был успешно добавлен', timeout: 2500 }));
      dispatch(replace('/admin/products/'));
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
  api.product.edit(editProduct.id, product)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Товар ${editProduct.id} был успешно изменен`, timeout: 2500 }));
      dispatch(replace(`/products/products/${editProduct.id}`));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка изменения товара', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};
