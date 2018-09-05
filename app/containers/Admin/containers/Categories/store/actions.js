import {
  SET_CATEGORY,
  SET_CATEGORIES,
  APPEND_CATEGORY,
  CHANGE_ADD_CATEGORY,
  CHANGE_CATEGORY_INFO,
  SET_CATEGORY_INFO,
  RESET_CATEGORY_INFO,
  RESET_CATEGORY_ADD,
  SET_IS_LOADING,
  RESET,
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setCategories = (value) => ({
  type: SET_CATEGORIES,
  payload: value,
});

export const setCategory = (index, data) => ({
  type: SET_CATEGORY,
  payload: {
    index,
    data
  },
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const changeCategoryInfo = (key, value) => ({
  type: CHANGE_CATEGORY_INFO,
  payload: {
    key,
    value
  },
});

export const appendCategory = (value) => ({
  type: APPEND_CATEGORY,
  payload: value,
});

export const changeAddCategory = (key, value) => ({
  type: CHANGE_ADD_CATEGORY,
  payload: {
    key,
    value
  },
});

export const setCategoryInfo = (value) => ({
  type: SET_CATEGORY_INFO,
  payload: value,
});

export const resetCategoriesList = () => ({ type: RESET });

export const resetCategoryInfo = () => ({ type: RESET_CATEGORY_INFO });

export const resetCategoryAdd = () => ({ type: RESET_CATEGORY_ADD });

export const pullCategories = () => (dispatch) => new Promise((resolve, reject) => {
  api.category.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setCategories(data.data));
      resolve();
    })
    .catch(() => reject());
})

export const addNewCategory = () => (dispatch, getState) => {
  const { name, description, type } = getState().Admin_Categories.addCategory;

  if (name.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните имя категории', timeout: 1000 }));
    return;
  }

  dispatch(setIsLoading(true));
  api.category.add(name, description, type)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(resetCategoryAdd());
      dispatch(appendCategory(data.data));
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Категория ${name} была добавлена`, timeout: 1000 }));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const applyCategoryName = (index) => (dispatch, getState) => {
  const {
    categoryInfo: {
      name,
      description,
      type
    },
    categories
  } = getState().Admin_Categories;
  const category = categories[index];

  const editCategory = {
    name: name === '' ? category.name : name,
    type,
    description: description === category.description ? category.description : description,
  };

  if (editCategory.name === category.name && editCategory.description === category.description && editCategory.type === category.type) return;

  if (editCategory.name.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните имя категории', timeout: 1000 }));
    return;
  }

  dispatch(setIsLoading(true));
  api.category.edit(category.id, editCategory.name, editCategory.description, editCategory.type)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(setCategory(index, data.data));
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Категория ${category.name} была изменена`, timeout: 1000 }));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
