import {
  SET_USER,
  RESET
} from './types';
import { api } from 'lib/api';

export const setUser = (value) => ({
  type: SET_USER,
  payload: value,
});

export const resetUserSingle = () => ({ type: RESET });

export const pullUser = (user_id) => (dispatch) => new Promise((resolve, reject) => {

  api.users.getSingle(user_id)
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setUser(data.data));
      resolve();
    })
    .catch(() => reject());

});
