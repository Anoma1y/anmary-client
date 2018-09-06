import {
  SET_USERS,
  RESET
} from './types';
import { api } from 'lib/api';

export const setUsers = (value) => ({
  type: SET_USERS,
  payload: value,
});

export const resetUserList = () => ({ type: RESET });

export const pullUsers = () => (dispatch) => new Promise((resolve, reject) => {
  api.users.getList()
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setUsers(data.data));
      resolve();
    })
    .catch(() => reject());
})
