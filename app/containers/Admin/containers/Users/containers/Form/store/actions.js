import {
  SET_USER,
  SET_IS_LOADING,
  SET_ROLES,
  RESET,
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import _ from 'lodash';
import { api } from 'lib/api';
import { removeEmpty } from 'lib/utils';
import uuid from 'uuid/v1';

export const setUser = (value) => ({
  type: SET_USER,
  payload: value,
});

export const setRoles = (value) => ({
  type: SET_ROLES,
  payload: value,
});

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const resetUserForm = () => ({ type: RESET });

export const pullUser = (user_id) => (dispatch, getState) => new Promise((resolve, reject) => {
  const { roles } = getState().Admin_Users_Form;

  api.users.getSingle(user_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();
      const user = data.data;
      const role_id = _.find(roles, { name: user.roles[0].name });

      const currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.profile.phone,
        role_id: role_id.id,
        status: user.profile.status,
      };

      dispatch(setUser(currentUser));
      resolve();
    })
    .catch(() => reject());

});

export const pullRoles = () => (dispatch) => new Promise((resolve, reject) => {
  api.roles.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setRoles(data.data));
      resolve();
    })
    .catch(() => reject());
});

export const addUser = () => (dispatch, getState) => {
  const { syncErrors, values } = getState().form.Admin_Users_Form;

  if (syncErrors || !values.role_id || !values.status) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните все необходимые поля', timeout: 1500 }));
    return;
  }

  const newUser = {
    name: values.name,
    email: values.email,
    password: values.password,
    phone: values.phone !== '' ? values.phone : undefined,
    role_id: values.role_id,
    status: values.status
  };

  dispatch(setIsLoading(true));
  api.users.add(removeEmpty(newUser))
    .then(() => {
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: 'Пользователь успешно добавлен', timeout: 4000 }));
      dispatch(replace('/admin/users'));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка валидации', timeout: 4000 }));
      dispatch(setIsLoading(false));
    });
};

export const editUser = () => (dispatch, getState) => {
  const {
    syncErrors,
    values: {
      name, email, password, phone, role_id, status
    }
  } = getState().form.Admin_Users_Form;
  const { user } = getState().Admin_Users_Form;

  if (syncErrors) return;

  const data = {
    name: user.name === name ? undefined : name,
    email: user.email === email ? undefined : email,
    password: user.password === password ? undefined : password,
    phone: user.phone === phone ? undefined : phone,
    role_id: user.role_id === role_id ? undefined : role_id,
    status: user.status === status ? undefined : status,
  };

  const removeEmpty = (obj) => {
    Object.keys(obj).forEach(key =>
      (obj[key] && typeof obj[key] === 'object') && removeEmpty(obj[key]) ||
      (obj[key] === undefined) && delete obj[key]
    );
    return obj;
  };

  const cleanData = removeEmpty(data);

  dispatch(setIsLoading(true));
  api.users.edit(user.id, cleanData)
    .then(() => {
      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Пользователь ${name} изменен`, timeout: 4000 }));
      dispatch(replace('/admin/users'));
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка валидации', timeout: 4000 }));
      dispatch(setIsLoading(false));
    });
};
