import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  SET_IS_LOADING,
  SET_ERROR,
  RESET,
} from './types';
import { replace } from 'react-router-redux';
import { RESET_ALL } from 'store/reducers';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import Storage from 'lib/storage';
import moment from 'moment';
import uuid from 'uuid/v1';
import _ from 'lodash';

export const changeLogin = (value) => ({
  type: CHANGE_EMAIL,
  payload: value,
});

export const changePassword = (value) => ({
  type: CHANGE_PASSWORD,
  payload: value,
});

export const setError = (error = '') => ({
  type: SET_ERROR,
  payload: error,
});

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const resetAuthSignin = () => ({ type: RESET });

export const logout = () => (dispatch) => {
  api.auth.logout()
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка выхода', timeout: 1000 }));
    })
    .finally(() => {
      dispatch(replace('/auth/signin'));
      dispatch({ type: RESET_ALL });
      Storage.clear();
    });
};

export const signin = () => (dispatch, getState) => {
  const {
    email,
    password
  } = getState().Auth_Signin;

  if (password.length < 6 || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    dispatch(setError('Ошибка валидации'));
    return;
  }

  dispatch(setIsLoading(true));
  api.auth.authorization(email.trim(), password.trim())
    .then((data) => {
      if (data.status !== 201) return;
      const { token, expires_in } = data.data;

      const currentTime = moment().unix();
      const expiration_time = ((currentTime * 1000) + (expires_in * 1000)) / 1000;

      Storage.set('members', { token, expiration_time });

      api.profile.getProfile(token)
        .then((data) => {
          if (data.status !== api.code.OK) {
            dispatch(resetAuthSignin());
            dispatch(replace('/'));
            return;
          }

          const permissions = _.uniq(data.data.roles.map((role) => role.permissions).reduce((a, b) => a.concat(b)));
          const role = _.find(data.data.roles, { name: 'root' });

          if (role) {
            Storage.set('is_superuser', true);
          }

          Storage.set('permissions', { permissions });
        })

      dispatch(resetAuthSignin());
      dispatch(replace('/'));
    })
    .catch((err) => {
      const { status } = err.response;

      if (status === api.code.UNAUTHORIZED) {
        dispatch(setError('Неверная почта или пароль'));
      }

    })
    .finally(() => dispatch(setIsLoading(false)));
};
