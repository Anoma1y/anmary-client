import {
  SET_NEWS,
  RESET,
} from './types';
import { api } from 'lib/api';

export const setNews = (value) => ({
  type: SET_NEWS,
  payload: value,
});

export const resetNewsSingle = () => ({ type: RESET });

export const pullNews = (news_id) => (dispatch) => new Promise((resolve, reject) => {
  api.news.getSingle(news_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setNews(data.data));
      resolve();
    })
    .catch(() => reject());
});
