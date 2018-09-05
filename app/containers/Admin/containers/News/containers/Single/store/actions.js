import {
  SET_OPERATION,
  RESET,
} from './types';
import { api } from 'lib/api';

export const setOperation = (value) => ({
  type: SET_OPERATION,
  payload: value,
});

export const resetOperationSingle = () => ({ type: RESET });

export const pullOperation = (operation_id) => (dispatch) => new Promise((resolve, reject) => {
  api.operations.getSingle(operation_id)
    .then((data) => {
      if (data.status !== 200) reject();

      dispatch(setOperation(data.data));
      resolve();
    })
    .catch(() => reject());
});
