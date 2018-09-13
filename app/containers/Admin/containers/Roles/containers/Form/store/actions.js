import {
  SET_ROLE,
  CHANGE_PERMISSION,
  SET_IS_LOADING,
  CHANGE_ROLE,
  RESET,
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setRole = (value) => ({
  type: SET_ROLE,
  payload: value,
});

export const changeRole = (key, value) => ({
  type: CHANGE_ROLE,
  payload: {
    key,
    value
  },
});

export const changePermission = (key, active) => ({
  type: CHANGE_PERMISSION,
  payload: {
    key,
    active
  }
});

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const resetRoleForm = () => ({ type: RESET });

export const pullRole = (role_id) => (dispatch) => new Promise((resolve, reject) => {
  api.roles.getSingle(role_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setRole(data.data));
      resolve();
    })
    .catch(() => reject());
})

export const addRole = () => (dispatch, getState) => {
  const { display_name, description, permissions } = getState().Admin_Roles_Form.role;
  const translitName = cyrillicToTranslit().transform(display_name.toLowerCase(), '_');

  if (display_name.length < 3 || translitName.length < 3) return;

  dispatch(setIsLoading(true));

  api.roles.add(translitName.trim(), display_name.trim(), description.trim(), permissions)
    .then(() => {
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Роль ${display_name} была добавлена`, timeout: 4000 }));
      dispatch(replace('/admin/roles'));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка валидации', timeout: 4000 }));
      dispatch(setIsLoading(false));
    });

};

export const editRole = () => (dispatch, getState) => {
  const { id, display_name, description, permissions } = getState().Admin_Roles_Form.role;

  if (display_name.length < 3) return;

  dispatch(setIsLoading(true));
  api.roles.edit(id, display_name.trim(), description.trim(), permissions)
    .then(() => {
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Роль ${display_name} была изменена`, timeout: 4000 }));
      dispatch(replace('/admin/roles'));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка валидации', timeout: 4000 }));
      dispatch(setIsLoading(false));
    });

};
