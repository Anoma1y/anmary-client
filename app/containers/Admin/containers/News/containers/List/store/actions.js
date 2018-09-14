import {
  SET_NEWS,
  SET_IS_LOADING,
  SET_IS_LOADING_TABLE,
  RESET,
} from './types';
import { api } from 'lib/api';

export const setNews = (value) => ({
  type: SET_NEWS,
  payload: value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const setIsLoadingTable = (value) => ({
  type: SET_IS_LOADING_TABLE,
  payload: value,
});

export const resetNewsList = () => ({ type: RESET });

export const pullNews = () => (dispatch) => new Promise((resolve, reject) => {

  dispatch(setIsLoadingTable(true));
  api.news.getList()
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      dispatch(setNews(data.data));
      resolve();
    })
    .catch(() => reject())
    .finally(() => dispatch(setIsLoadingTable(false)));
});
