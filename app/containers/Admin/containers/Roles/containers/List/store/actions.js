import {
  SET_ROLES,
  RESET,
} from './types';
import { api } from 'lib/api';

export const setRoles = (value) => ({
  type: SET_ROLES,
  payload: value,
});

export const resetRoleList = () => ({ type: RESET });

export const pullRoles = () => (dispatch) => new Promise((resolve, reject) => {
  api.roles.getList()
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setRoles(data.data));
      resolve();
    })
    .catch(() => reject());
})
