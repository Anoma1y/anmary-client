import {
  SET_IS_LOADING,
  SET_IS_SENT
} from './types';
import { send} from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const setIsSent = (value) => ({
  type: SET_IS_SENT,
  payload: value,
});

export const sendFeedback = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    values,
    syncErrors
  } = getState().form.Shop_Contact;

  if (syncErrors) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Ошибка валидации', timeout: 1000 }));
  }

  const { contact_name, contact_address, text } = values;

  dispatch(setIsLoading(true));
  api.feedback.send(contact_name, contact_address, text)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Спасибо!', message: 'Ваш вопрос был отправлен', timeout: 1000 }));
      dispatch(setIsSent(true));
      resolve();
    })
    .catch(() => {
      dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Произошла ошибка при отправке', timeout: 1000 }));
      reject();
    })
    .finally(() => dispatch(setIsLoading(false)));
});
