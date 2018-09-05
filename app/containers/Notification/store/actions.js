import {
  SEND_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_ALL_NOTIFICATION
} from './types';

export const sendNotification = (notification) => ({
  type: SEND_NOTIFICATION,
  payload: notification
});

export const remove = (id) => ({
  type: REMOVE_NOTIFICATION,
  payload: id
});

export const clearAll = () => ({ type: CLEAR_ALL_NOTIFICATION });

export const send = (notification) => {
  const payload = Object.assign({}, notification);

  if (!payload.id) {
    payload.id = new Date().getTime();
  }

  return (dispatch) => {
    dispatch(sendNotification(payload));

    if (payload.timeout) {

      setTimeout(() => {
        dispatch(remove(payload.id));
      }, payload.timeout);

    }
  };
};

