import {
  SET_NEWS,
  RESET
} from './types';
import { api } from 'lib/api';

export const setNews = (value) => ({
  type: SET_NEWS,
  payload: value,
});

export const resetNews = (value) => ({
  type: RESET,
  payload: value,
});

export const pullNews = () => (dispatch) => new Promise((resolve, reject) => {
  api.news.getList()
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(setNews(data.data));
      resolve();
    })
    .catch(() => reject());
});
