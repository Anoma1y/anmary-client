import {
  SET_IMAGE,
  SET_IS_LOADING,
  SET_NEWS,
  REMOVE_IMAGE,
  RESET,
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import uuid from 'uuid/v1';

export const setNews = (value) => ({
  type: SET_NEWS,
  payload: value,
});

export const setImage = (value) => ({
  type: SET_IMAGE,
  payload: value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const removeImage = () => ({ type: REMOVE_IMAGE });

export const resetFormNews = () => ({ type: RESET });

export const pullNews = (news_id) => (dispatch) => new Promise((resolve, reject) => {

  api.news.getSingle(news_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const news = {
        id: data.data.id,
        name: data.data.name,
        content: data.data.content,
        created_at: data.data.created_at,
      };

      dispatch(setImage(data.data.image));
      dispatch(setNews(news));
      resolve();
    })
    .catch(() => reject());
});

export const uploadImage = (formData) => (dispatch) => {

  dispatch(setIsLoading(true));
  api.images.add(formData)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(setImage(data.data));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка загрузки изображения', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addNews = () => (dispatch, getState) => {
  const {
    form: {
      Admin_News_Form: {
        values,
        syncError
      }
    },
    Admin_News_Form: {
      image
    }
  } = getState();

  if (syncError
    || !values
    || !values.name
    || !values.content
    || !(image && image.id)
  ) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните все необходимые поля формы', timeout: 2500 }));
    return;
  }

  const news = {
    ...values,
    image_id: image.id,
  };

  dispatch(setIsLoading(true));
  api.news.add(news)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: 'Новость была успешно добавлен', timeout: 2500 }));
      dispatch(replace('/admin/news/'));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка добавления новой новости', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};

export const editNews = () => (dispatch, getState) => {
  const {
    form: {
      Admin_News_Form: {
        values,
        syncError
      }
    },
    Admin_News_Form: {
      news: editNews,
      image
    }
  } = getState();

  if (syncError
    || !values
    || !values.name
    || !values.content
    || !(image && image.id)
  ) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните все необходимые поля формы', timeout: 2500 }));
    return;
  }
  const news = {
    ...values,
    image_id: image.id,
  };

  dispatch(setIsLoading(true));
  api.news.edit(editNews.id, news)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Новость ${editNews.name} была успешно изменена`, timeout: 2500 }));
      dispatch(replace('/admin/news/'));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка изменения новости', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};
