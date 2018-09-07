import {
  SET_USER
} from './types';
import { api } from 'lib/api';
import Storage from 'lib/storage';
import _ from 'lodash';

export const setUser = (value) => ({
  type: SET_USER,
  payload: value,
});

export const pullUser = () => (dispatch) => new Promise((resolve, reject) => {
  api.profile.getProfile()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const permissions = _.uniq(data.data.roles.map((role) => role.permissions).reduce((a, b) => a.concat(b)));
      const role = _.find(data.data.roles, { name: 'root' });

      if (role) {
        Storage.set('is_superuser', true);
      }

      Storage.set('permissions', { permissions });
      dispatch(setUser(data.data));
      resolve();
    })
    .catch(() => reject());
});
