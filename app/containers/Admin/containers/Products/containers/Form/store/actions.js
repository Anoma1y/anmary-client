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
  const { sizes, sizesUsed, currentSize } = getState().Admin_Products_Form;

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
  const { sizesProduct, sizesUsed, sizesAvailable } = getState().Admin_Products_Form;

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
  const { compositions, compositionsUsed, currentComposition, currentComposition_Value } = getState().Admin_Products_Form;

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
  const { compositionsProduct, compositionsUsed, compositionsAvailable } = getState().Admin_Products_Form;

  const { composition_id } = compositionsProduct[index];

  const newCompositionUsed = compositionsUsed.filter((item) => item !== composition_id);
  const newCompositionAvailable = [...compositionsAvailable, composition_id].sort((a, b) => a - b);

  dispatch(changeCurrentComposition(''));
  dispatch(setCompositionsUsed(newCompositionUsed));
  dispatch(setCompositionsAvailable(newCompositionAvailable));
  dispatch(removeComposition(composition_id));
};

export const pullProduct = (product_id) => (dispatch, getState) => new Promise((resolve, reject) => {

  const { sizes, compositions } = getState().Admin_Products_Form;

  api.product.getSingle(product_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const product = {
        id: data.data.id,
        name: data.data.name,
        article: data.data.article,
        description: data.data.description,
        category_id: data.data.category.id,
        brand_id: data.data.brand.id,
        season_id: data.data.season.id,
        price: String(amountOutput(data.data.price).value),
        discount: data.data.discount,
        is_available: data.data.is_available,
      };

      const getSizeID = sizes.map((it) => it.id);
      const sizesUsedId = data.data.sizes.map((it) => it.size_id);
      const newSizesAvailable = _.difference(getSizeID, sizesUsedId);
      dispatch(setSizesAvailable(newSizesAvailable));
      dispatch(setSizesUsed(sizesUsedId));
      const getCompositionID = compositions.map((it) => it.id);

      const compositionsUsedId = data.data.compositions.map((it) => it.composition_id);
      const newCompositionsAvailable = _.difference(getCompositionID, compositionsUsedId);
      dispatch(setCompositionsAvailable(newCompositionsAvailable));
      dispatch(setCompositionsUsed(compositionsUsedId));

      dispatch(setSizesProduct(data.data.sizes));
      dispatch(setCompositionsProduct(data.data.compositions));
      dispatch(setImages(data.data.images));
      dispatch(setProduct(product));
      resolve({
        price: product.price,
        discount: product.discount
      });
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
      Admin_Products_Form: {
        values,
        syncError
      }
    },
    Admin_Products_Form: {
      sizesProduct,
      compositionsProduct,
      images
    }
  } = getState();

  if (syncError
    || !values
    || !values.price
    || !values.discount
    || !values.category_id
    || !values.season_id
    || !values.brand_id
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
    category_id: Number(values.category_id),
    brand_id: Number(values.brand_id),
    season_id: Number(values.season_id),
    price: amountInput(typeof values.price === 'string' ? values.price.replace(/,/g, '') : values.price),
    discount: Number(typeof values.discount === 'string' ? values.discount.replace(/,/g, '') : values.discount),
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
      Admin_Products_Form: {
        values,
        syncError
      }
    },
    Admin_Products_Form: {
      product: editProduct,
      sizesProduct,
      compositionsProduct,
      images
    }
  } = getState();

  if (syncError
    || !values
    || !values.price
    || !values.category_id
    || !values.season_id
    || !values.brand_id
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
    category_id: Number(values.category_id),
    brand_id: Number(values.brand_id),
    season_id: Number(values.season_id),
    price: amountInput(typeof values.price === 'string' ? values.price.replace(/,/g, '') : values.price),
    discount: !values.discount ? 0 : Number(typeof values.discount === 'string' ? values.discount.replace(/,/g, '') : values.discount),
    size: productSizes,
    image: productImages,
    composition: productCompositions
  };

  dispatch(setIsLoading(true));
  api.product.edit(editProduct.id, product)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Товар ${editProduct.name} был успешно изменен`, timeout: 2500 }));
      dispatch(replace('/admin/products/'));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка изменения товара', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};

export const setDefaultImage = (image_id) => (dispatch, getState) => {
  const { images } = getState().Admin_Products_Form;
  const find_old_image = _.find(images, { is_default: true });

  if (!find_old_image) {
    dispatch(setIsLoading(true));
    api.images.set_default(image_id)
      .then((data) => {

        if (data.status !== api.code.OK) return;

        const oldImages = images.filter((image) => image.id !== image_id);

        dispatch(setImages([data.data, ...oldImages]));
        dispatch(setIsLoading(false));
      });
  } else {
    dispatch(setIsLoading(true));
    api.images.change_default(find_old_image.id, image_id)
      .then((data) => {
        if (data.status !== api.code.OK) return;

        const oldImages = images.filter((image) => {
          if (image.id === image_id || image.id === find_old_image.id) {
            return false;
          }
          return true;
        });

        const { old_image, new_image } = data.data;
        dispatch(setImages([new_image, old_image, ...oldImages]));
        dispatch(setIsLoading(false));
      });
  }

};
