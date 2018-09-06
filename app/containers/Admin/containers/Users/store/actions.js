import {
  SET_SCHEMA
} from './types';
import { api } from 'lib/api';

export const setSchema = (value) => ({
  type: SET_SCHEMA,
  payload: value,
});

export const pullSchema = () => (dispatch) => new Promise((resolve, reject) => {
  api.users.getSchema()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setSchema(data.data));
      resolve()
    })
    .catch(() => reject());
});

