import {
  SET_COMPOSITION,
  SET_COMPOSITIONS,
  APPEND_COMPOSITION,
  CHANGE_ADD_COMPOSITION,
  CHANGE_COMPOSITION_INFO,
  SET_COMPOSITION_INFO,
  RESET_COMPOSITION_INFO,
  RESET_COMPOSITION_ADD,
  SET_IS_LOADING,
  RESET,
} from './types';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setCompositions = (value) => ({
  type: SET_COMPOSITIONS,
  payload: value,
});

export const setComposition = (index, data) => ({
  type: SET_COMPOSITION,
  payload: {
    index,
    data
  },
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const changeCompositionInfo = (key, value) => ({
  type: CHANGE_COMPOSITION_INFO,
  payload: {
    key,
    value
  },
});

export const appendComposition = (value) => ({
  type: APPEND_COMPOSITION,
  payload: value,
});

export const changeAddComposition = (key, value) => ({
  type: CHANGE_ADD_COMPOSITION,
  payload: {
    key,
    value
  },
});

export const setCompositionInfo = (value) => ({
  type: SET_COMPOSITION_INFO,
  payload: value,
});

export const resetCompositionsList = () => ({ type: RESET });

export const resetCompositionInfo = () => ({ type: RESET_COMPOSITION_INFO });

export const resetCompositionAdd = () => ({ type: RESET_COMPOSITION_ADD });

export const pullCompositions = () => (dispatch) => new Promise((resolve, reject) => {
  api.composition.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setCompositions(data.data));
      resolve();
    })
    .catch(() => reject());
})

export const addNewComposition = () => (dispatch, getState) => {
  const { name, description, type } = getState().Admin_Compositions.addComposition;

  if (name.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните имя состава', timeout: 1000 }));
    return;
  }

  dispatch(setIsLoading(true));
  api.composition.add(name, description, type)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(resetCompositionAdd());
      dispatch(appendComposition(data.data));
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Состав ${name} была добавлена`, timeout: 1000 }));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const applyCompositionName = (index) => (dispatch, getState) => {
  const {
    compositionInfo: {
      name,
      description
    },
    compositions
  } = getState().Admin_Compositions;
  const composition = compositions[index];

  const editComposition = {
    name: name === '' ? composition.name : name,
    description: description === composition.description ? composition.description : description,
  };

  if (editComposition.name === composition.name && editComposition.description === composition.description) return;

  if (editComposition.name.length === 0) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните имя состава', timeout: 1000 }));
    return;
  }

  dispatch(setIsLoading(true));
  api.composition.edit(composition.id, editComposition.name, editComposition.description)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(setComposition(index, data.data));
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Категория ${composition.name} была изменена`, timeout: 1000 }));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
